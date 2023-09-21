import React, { useState } from 'react';
import question from './questions.json';

export default function Quiz() {
  let [selectedOptions, setSelectedOptions] = useState([]);
  const getOptionClass = (q, option) => {
    let c = 'list-group-item';

    const isOptionSelected = selectedOptions.some(
      (selectedOption) =>
        selectedOption.qid === q.id && selectedOption.option === option
    );

    if (isOptionSelected) {
      c += ' bg-info';
    }

  

    return c;
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
    <>
        <div className="container mt-5">
        <h1>DBMS Questions</h1>
        {question.map((q) => (
          <div key={q.id}>
            <p >{q.statement}</p>
            
            <ul className="list-group">
              {q.options.map((option, index) => (
                <li
                  key={option}
                  className={getOptionClass(q, option)}
                  onClick={() => onOptionClick(q.id, option)}
                >
                 {++index}-{option}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p>Your score: {calculateScore()}</p>
        </div>
      </div>
    </>
  );
}
