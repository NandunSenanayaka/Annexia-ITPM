import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      const replyMessage = generateReply(input);

      setMessages([...messages, userMessage, replyMessage]);
      setInput('');
    }
  };

//   const generateReply = (question) => {
//     let replyText = 'Sorry, I did not understand that. Please ask about treatments.';

//     const lowerCaseQuestion = question.toLowerCase();

//     if (lowerCaseQuestion.includes('hi') || lowerCaseQuestion.includes('hey') || lowerCaseQuestion.includes('hello')) {
//         replyText = 'Hello! How can I help you?';
//     } else if (lowerCaseQuestion.includes('thank you') || lowerCaseQuestion.includes('thanks') || lowerCaseQuestion.includes('thankyou')) {
//         replyText = 'You’re welcome!';
//     } else if (lowerCaseQuestion.includes('ok') || lowerCaseQuestion.includes('okey') || lowerCaseQuestion.includes('okay') || lowerCaseQuestion.includes('k') || lowerCaseQuestion.includes('kk')) {
//         replyText = 'Okay. Have a nice day!';
//     } else if (lowerCaseQuestion.includes('bye')) {
//         replyText = 'Bye and have a nice day!';
//     } else if (lowerCaseQuestion.includes('treatment')) {
//         replyText = 'We offer a variety of Ayurvedic treatments. Please visit our Treatments page for more information.';
//     } else if (lowerCaseQuestion.includes('appointment')) {
//         replyText = 'You can request an appointment directly from our website. Just click the "Request an Appointment" button.';
//     } else if (lowerCaseQuestion.includes('contact')) {
//         replyText = 'You can contact us at 0777471333 or email us at support@wellnessayurvedahospital.com.';
//     } else if (lowerCaseQuestion.includes('hours')) {
//         replyText = 'Our hospital is open from 8 AM to 8 PM, Monday to Saturday.';
//     } else if (lowerCaseQuestion.includes('location')) {
//         replyText = 'We are located at 123 Ayurvedic Lane, Wellness City.';
//     } else if (lowerCaseQuestion.includes('doctors')) {
//         replyText = 'We have a team of experienced Ayurvedic doctors. You can choose your preferred doctor when booking an appointment.';
//     } else if (lowerCaseQuestion.includes('insurance')) {
//         replyText = 'Please check with your insurance provider to see if they cover our treatments.';
//     } else if (lowerCaseQuestion.includes('cost')) {
//         replyText = 'The cost of treatment varies. Please visit our Pricing page or contact us for more details.';
//     }

//     return { sender: 'bot', text: replyText };
// };
const generateReply = (question) => {
  let replyText = 'Sorry, I did not understand that. Please ask about annex rentals, pricing, or availability.';

  const lowerCaseQuestion = question.toLowerCase();

  if (lowerCaseQuestion.includes('hi') || lowerCaseQuestion.includes('hey') || lowerCaseQuestion.includes('hello')) {
      replyText = 'Hello! Welcome to Annexia. How can I assist you?';
  } else if (lowerCaseQuestion.includes('thank you') || lowerCaseQuestion.includes('thanks')) {
      replyText = 'You’re welcome! Let me know if you need more help.';
  } else if (lowerCaseQuestion.includes('ok') || lowerCaseQuestion.includes('okay')) {
      replyText = 'Alright! Let me know if you need anything else.';
  } else if (lowerCaseQuestion.includes('bye')) {
      replyText = 'Goodbye! Have a great day!';
  } else if (lowerCaseQuestion.includes('annex') || lowerCaseQuestion.includes('rental')) {
      replyText = 'We offer a variety of annexes for rent. You can browse available properties on our website.';
  } else if (lowerCaseQuestion.includes('price') || lowerCaseQuestion.includes('cost') || lowerCaseQuestion.includes('rent')) {
      replyText = 'Rental prices vary based on location and amenities. Please visit our Pricing page or contact us for details.';
  } else if (lowerCaseQuestion.includes('availability') || lowerCaseQuestion.includes('rooms')) {
      replyText = 'You can check available annexes on our website or contact us for the latest listings.';
  } else if (lowerCaseQuestion.includes('location')) {
      replyText = 'We have annexes available in multiple locations. Please specify your preferred area.';
  } else if (lowerCaseQuestion.includes('contact')) {
      replyText = 'You can contact us via email at support@annexia.com or call us at +94 XXX XXX XXX.';
  } else if (lowerCaseQuestion.includes('appointment') || lowerCaseQuestion.includes('visit')) {
      replyText = 'You can schedule a visit by filling out the appointment form on our website.';
  } else if (lowerCaseQuestion.includes('deposit') || lowerCaseQuestion.includes('payment')) {
      replyText = 'Most annex rentals require a deposit. Payment details are provided when booking.';
  } else if (lowerCaseQuestion.includes('contract') || lowerCaseQuestion.includes('agreement')) {
      replyText = 'All rentals require a rental agreement. You can review the terms on our website before booking.';
  }

  return { sender: 'bot', text: replyText };
};


  return (
    <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
      <button className="chatbox-toggle" onClick={toggleChatbox}>
        {isOpen ? 'Close Chat' : 'Chat with Us'}
      </button>
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbox-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input 
              type="text" 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Type your question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
