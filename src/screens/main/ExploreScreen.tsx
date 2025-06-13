// src/screens/main/ExploreScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { AnimatedView } from '../../components/common/AnimatedView';
import { Input } from '../../components/common/Input';
import Card from '../../components/common/Card';
import { dummyData } from '../../services/dummyData';

export const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);

  useEffect(() => {
    setCategories(dummyData.exploreCategories);
    setContent(dummyData.exploreContent);
    setFilteredContent(dummyData.exploreContent);
  }, []);

  useEffect(() => {
    let filtered = content;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  }, [searchQuery, selectedCategory, content]);

  const renderCategory = ({ item, index }: { item: any; index: number }) => (
    <AnimatedView animation="slideUp" delay={index * 100}>
      <TouchableOpacity
        style={[
          styles.categoryCard,
          selectedCategory === item.id && styles.selectedCategoryCard
        ]}
        onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
      >
        <LinearGradient
          colors={[item.color + '20', item.color + '40']}
          style={styles.categoryGradient}
        >
          <Ionicons name={item.icon} size={32} color={item.color} />
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.itemCount} items</Text>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedView>
  );

  const renderContentItem = ({ item, index }: { item: any; index: number }) => (
    <AnimatedView animation="slideUp" delay={index * 50}>
      <Card style={styles.contentCard}>
        <View style={styles.contentHeader}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentTitle}>{item.title}</Text>
            <Text style={styles.contentDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons
              name={item.isFavorited ? "heart" : "heart-outline"}
              size={24}
              color={item.isFavorited ? colors.error.main : colors.text.secondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentMeta}>
          <View style={styles.contentType}>
            <Ionicons
              name={getTypeIcon(item.type)}
              size={16}
              color={colors.primary.main}
            />
            <Text style={styles.contentTypeText}>{item.type}</Text>
          </View>
          <Text style={styles.contentDuration}>{item.duration}</Text>
        </View>
      </Card>
    </AnimatedView>
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise': return 'fitness-outline';
      case 'article': return 'document-text-outline';
      case 'video': return 'play-circle-outline';
      case 'audio': return 'headset-outline';
      default: return 'book-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedView animation="fadeIn" style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover content to support your wellness journey</Text>
        </AnimatedView>

        {/* Search */}
        <AnimatedView animation="slideUp" delay={200} style={styles.searchSection}>
          <Input
            placeholder="Search for content..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon="search-outline"
            style={styles.searchInput}
          />
        </AnimatedView>

        {/* Categories */}
        <AnimatedView animation="slideUp" delay={400} style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </AnimatedView>

        {/* Featured Content */}
        {!selectedCategory && !searchQuery && (
          <AnimatedView animation="slideUp" delay={600} style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Content</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dummyData.featuredContent.map((item, index) => (
                <AnimatedView key={item.id} animation="slideUp" delay={700 + index * 100}>
                  <Card style={styles.featuredCard}>
                    <LinearGradient
                      colors={[colors.secondary.light, colors.secondary.main]}
                      style={styles.featuredGradient}
                    >
                      <Ionicons name="star" size={24} color={colors.text.inverse} />
                      <Text style={styles.featuredTitle}>{item.title}</Text>
                      <Text style={styles.featuredDuration}>{item.duration}</Text>
                    </LinearGradient>
                  </Card>
                  // src/screens/main/ExploreScreen.tsx (continued)
                </AnimatedView>
              ))}
            </ScrollView>
          </AnimatedView>
        )}

        {/* Content Results */}
        <AnimatedView animation="slideUp" delay={800} style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ?
                categories.find(c => c.id === selectedCategory)?.name :
                searchQuery ? `Results for "${searchQuery}"` : 'All Content'
              }
            </Text>
            <Text style={styles.resultCount}>{filteredContent.length} items</Text>
          </View>

          <FlatList
            data={filteredContent}
            renderItem={renderContentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInput: {
    marginBottom: 0,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    width: 140,
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  featuredCard: {
    marginLeft: 20,
    borderRadius: 16,
    overflow: 'hidden',
    width: 200,
  },
  featuredGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
    marginTop: 8,
    textAlign: 'center',
  },
  featuredDuration: {
    fontSize: 12,
    color: colors.text.inverse,
    opacity: 0.8,
    marginTop: 4,
  },
  contentSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  resultCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  contentCard: {
    marginBottom: 16,
    padding: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentInfo: {
    flex: 1,
    marginRight: 12,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  favoriteButton: {
    padding: 4,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTypeText: {
    fontSize: 12,
    color: colors.primary.main,
    marginLeft: 4,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  contentDuration: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

