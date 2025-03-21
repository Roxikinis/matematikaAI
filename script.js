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

// Get the answer from Math.js API and display it
async function getAnswerFromAI(question) {
  try {
    // Make API request to Math.js to evaluate the expression
    const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(question)}`);
    const data = await response.json();

    // Display the AI answer
    const aiResponse = `AI atsakymas: ${data.result}`;
    displayAIMessage(aiResponse);
  } catch (error) {
    // Handle error if the API call fails
    const aiResponse = 'Atsiprašome, įvyko klaida bandant atlikti skaičiavimą.';
    displayAIMessage(aiResponse);
  }
}

// Display AI response in the chatbox
function displayAIMessage(message) {
  const aiMessageDiv = document.createElement('div');
  aiMessageDiv.classList.add('ai-message');
  aiMessageDiv.textContent = message;
  chatOutput.appendChild(aiMessageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
}
