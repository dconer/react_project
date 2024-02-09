import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
  "Invest your mind 🤯",
  "Invest your family 👨‍👩‍👧‍👦",
  "Invest your health 👨🏿‍⚕️",
  "Invest your planet 🌍",
];
//////// Step project

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  const style = {
    backgroundColor: "#7950f2",
    color: "#fff",
  };

  const numberBox = messages.length;
  const boxes = Array.from({ length: numberBox }, (_, i) => i);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < numberBox) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setOpen(!isOpen)}>
        {isOpen ? "🔼" : "🔽"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {boxes.map((i) => (
              <div key={i} className={`${step >= i + 1 ? "active" : ""}`}>
                {i + 1}
              </div>
            ))}
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={style}
              onClick={handlePrevious}
              onMouseEnter={() => {}}
            >
              Previous
            </button>
            <button style={style} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

//////// Date Counter

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);

//   const date = new Date("january 28 2024");
//   date.setDate(date.getDate() + count);
//   return (
//     <>
//       <Step step={step} setStep={setStep} />
//       <Count count={count} setCount={setCount} step={step} />
//       <p>Today is {date.toDateString()}</p>
//     </>
//   );
// }

// function Count({ count, setCount, step }) {
//   return (
//     <div>
//       <button onClick={() => setCount((c) => c - step)}>-</button>
//       <span>Count: {count}</span>
//       <button onClick={() => setCount((c) => c + step)}>+</button>
//     </div>
//   );
// }

// function Step({ step, setStep }) {
//   return (
//     <div>
//       <button onClick={() => setStep((s) => s - 1)}>-</button>
//       <span>Step: {step}</span>
//       <button onClick={() => setStep((s) => s + 1)}>+</button>
//     </div>
//   );
// }

//////// Card flipped

// export default function App() {
//   return (
//     <div className="App">
//       <FlashCards />
//     </div>
//   );
// }

// const questions = [
//   {
//     id: 3457,
//     question: "What language is React based on?",
//     answer: "JavaScript",
//   },
//   {
//     id: 7336,
//     question: "What are the building blocks of React apps?",
//     answer: "Components",
//   },
//   {
//     id: 8832,
//     question: "What's the name of the syntax we use to describe a UI in React?",
//     answer: "JSX",
//   },
//   {
//     id: 1297,
//     question: "How to pass data from parent to child components?",
//     answer: "Props",
//   },
//   {
//     id: 9103,
//     question: "How to give components memory?",
//     answer: "useState hook",
//   },
//   {
//     id: 2002,
//     question:
//       "What do we call an input element that is completely synchronised with state?",
//     answer: "Controlled element",
//   },
// ];

// function FlashCards() {
//   const [selectedId, setSelectedId] = useState(0);

//   return (
//     <div className="flashcards">
//       {questions.map((quest) => (
//         <div
//           key={quest.id}
//           className={selectedId === quest.id ? "selected" : ""}
//           onClick={() => setSelectedId(quest.id)}
//         >
//           {selectedId === quest.id ? quest.answer : quest.question}
//         </div>
//       ))}
//     </div>
//   );
// }
