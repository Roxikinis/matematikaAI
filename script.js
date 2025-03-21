// Elements
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatOutput = document.getElementById('chat-output');

// Handle sending user input
sendButton.addEventListener('click', () => {
  const inputText = userInput.value.trim();
  if (inputText) {
    displayUserMessage(inputText);
    getAnswerFromAI(inputText);
  }
  userInput.value = ''; // Clear input field
});

// Display user message in the chatbox
function displayUserMessage(message) {
  const userMessageDiv = document.createElement('div');
  userMessageDiv.classList.add('user-message');
  userMessageDiv.textContent = `Tu: ${message}`;
  chatOutput.appendChild(userMessageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
}

// Simulate AI response (replace with API call later)
function getAnswerFromAI(question) {
  // For now, simulate a math answer based on user input
  const aiResponse = `AI atsakymas: ${simulateMathAnswer(question)}`;
  displayAIMessage(aiResponse);
}

// Display AI response in the chatbox
function displayAIMessage(message) {
  const aiMessageDiv = document.createElement('div');
  aiMessageDiv.classList.add('ai-message');
  aiMessageDiv.textContent = message;
  chatOutput.appendChild(aiMessageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
}

// Simulate generating a math answer (replace this with an actual math AI)
function simulateMathAnswer(question) {
  // Simple simulation: If question contains numbers and a '+' sign, return sum
  const match = question.match(/(\d+)\s*\+\s*(\d+)/);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return num1 + num2;
  } else {
    return 'Atsiprašome, nesu tikras, kaip atsakyti į šį klausimą.';
  }
}
