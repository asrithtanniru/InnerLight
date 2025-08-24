

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + 'AIzaSyANu4KdIvMGufI045rlL4nzxAyscfFwtBg',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are a mindfulness and wellness chatbot called Emey. Reply politely, with empathy, and encouraging tone in max of 5-6 lines if the user's message is long. User says: ${userMessage}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "I’m here to listen. Could you share more?";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Hmm, something went wrong. Let's try again.";
  }
};
