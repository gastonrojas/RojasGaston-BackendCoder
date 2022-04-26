const fs = require('fs');

const saveMessage = async (message) => {
  try {
    let messages = [];
    await getAllMessages().then((allMessages) => (messages = allMessages));
    messages.push(message);
    await fs.promises.writeFile('./public/messages.txt', JSON.stringify(messages));
  } catch (err) {
    console.error(err);
  }
};

const getAllMessages = async () => {
  try {
    const data = await fs.promises.readFile('./public/messages.txt', 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveMessage, getAllMessages };
