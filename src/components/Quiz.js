import React, { useState } from 'react';
import question from './questions.json';
import App from '../App.css';

export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const getOptionClass = (q, option) => {
    let classes = 'list-group-item';

    const isOptionSelected = selectedOptions.some(
      (selectedOption) =>
        selectedOption.qid === q.id && selectedOption.option === option
    );

    if (isOptionSelected) {
      classes += ' listbgcolor';
    }

    return classes;
  };

  const onOptionClick = (qid, option) => {
    const ans = { qid, option };
    let copyArr = [...selectedOptions];
    copyArr = copyArr.filter((selectedOption) => selectedOption.qid !== qid);
    copyArr.push(ans);
    setSelectedOptions(copyArr);
    console.log(copyArr);
  };

  const calculateScore = () => {
    let score = 0;

    selectedOptions.forEach((selectedOption) => {
      const questionObj = question.find((q) => q.id === selectedOption.qid);
      if (questionObj.answer === selectedOption.option) {
        score += 1;
      }
    });

    return score;
  };

  return (
    <div className="container mt-5">
      {question.map((q, index) => (
        <div className="accordion" id={`accordion-${q.id}`} key={q.id}>
          <div className={`accordion-item${index === 0 ? ' open' : ''}`}>
            <h2 className="accordion-header" id={`heading-${q.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${q.id}`}
                aria-expanded={index === 0 ? 'true' : 'false'} // Open the first item, others closed
                aria-controls={`collapse-${q.id}`}
              >
                {q.statement}
              </button>
            </h2>
            <div
              id={`collapse-${q.id}`}
              className={`accordion-collapse collapse${index === 0 ? ' show' : ''}`}
              aria-labelledby={`heading-${q.id}`}
              data-bs-parent={`#accordion-${q.id}`}
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {q.options.map((option, optionIndex) => (
                    <li
                      key={option}
                      className={getOptionClass(q, option)}
                      onClick={() => onOptionClick(q.id, option)}
                    >
                      {++optionIndex}: {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="card text-center">
        <div className="card-header">Online Test Result</div>
        <div className="card-body">
          <h5 className="card-title">Result</h5>
          <p className="card-text">Your Score is : <strong>{calculateScore()}</strong></p>
        </div>
      </div>
    </div>
  );
}
