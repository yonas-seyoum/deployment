export const getFirstQuestion = (type: string, difficulty: string): string => {
  const questions: Record<string, Record<string, string>> = {
    "Software Engineer": {
      Easy: "Can you tell me about yourself and your experience with software development?",
      Medium:
        "Describe a challenging technical problem you've solved recently. What was your approach?",
      Hard: "Explain how you would design a scalable microservices architecture for a high-traffic application.",
    },
    Accountant: {
      Easy: "What drew you to a career in accounting?",
      Medium:
        "How do you ensure accuracy when working with financial statements?",
      Hard: "Describe your experience with financial forecasting and budget analysis.",
    },
    "Project Manager": {
      Easy: "Tell me about your project management experience.",
      Medium: "How do you handle scope creep in a project?",
      Hard: "Describe a time when you had to manage a project with limited resources and tight deadlines.",
    },
    Sales: {
      Easy: "What makes you a good salesperson?",
      Medium: "How do you handle objections from potential clients?",
      Hard: "Describe your strategy for closing a high-value deal.",
    },
    Custom: {
      Easy: "Let's start with a general question: What are your career goals?",
      Medium: "What skills do you think are most important for this role?",
      Hard: "Describe a situation where you had to make a difficult decision.",
    },
  };

  return (
    questions[type]?.[difficulty] || questions["Software Engineer"]["Medium"]
  );
};

export const getAIResponse = (
  userAnswer: string,
  questionNumber: number
): string => {
  const responses = [
    "That's interesting. Can you provide more details about that?",
    "Thank you for sharing. Let me ask you another question: How do you handle stress in a professional setting?",
    "Good answer. Now, can you describe a time when you worked in a team?",
    "I see. What do you think are your biggest strengths?",
    "Thank you. One final question: Where do you see yourself in 5 years?",
  ];

  if (questionNumber >= responses.length) {
    return "Thank you for your answers. The interview is now complete. Let me prepare your results...";
  }

  return responses[questionNumber] || "Thank you for that answer.";
};

export const getInterviewResults = () => {
  // Simulate results based on interview
  return {
    score: Math.floor(Math.random() * 30) + 70, // 70-100
    strengths: [
      "Clear communication",
      "Strong technical knowledge",
      "Good problem-solving approach",
    ],
    weakAreas: [
      "Could provide more specific examples",
      "Consider elaborating on past experiences",
    ],
    suggestions: [
      "Practice more behavioral interview questions",
      "Prepare specific examples using STAR method",
      "Review technical concepts related to your field",
    ],
  };
};

export const getInitialQuestionCategories = () => [
  {
    id: "technical",
    name: "Technical Questions",
    type: "technical" as const,
    completed: false,
  },
  {
    id: "behavioral",
    name: "Behavioral Questions",
    type: "behavioral" as const,
    completed: false,
  },
  {
    id: "ethical",
    name: "Ethical Questions",
    type: "ethical" as const,
    completed: false,
  },
  {
    id: "situational",
    name: "Situational Questions",
    type: "situational" as const,
    completed: false,
  },
];

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

