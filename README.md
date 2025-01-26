# SBA_308: JavaScript Fundamentals

## Project Overview

You can see the project from this link https://www.canva.com/design/DAFxJzEGlWs/OxnBpoTDbneAidu7eN9WLw/edit

---

## Introduction

This assessment evaluates your understanding of fundamental JavaScript concepts and your ability to apply these concepts in a practical scenario. While creativity in your implementation is encouraged, ensure that you meet all the specified objectives and requirements.

---

## Objectives

1. Employ basic JavaScript syntax accurately.
2. Implement control flow structures such as conditionals and loops effectively.
3. Use arrays and objects to organize and manage data.
4. Develop functions to create reusable code.
5. Utilize loops and iteration to navigate through data collections.
6. Implement error handling to gracefully manage potential code failures.

---

## Steps I Did to get the Output

1. **Data Validation:**

   - ensured that the assignment is tied to the correct course and that all necessary details are provided for each assignment (e.g., `points_possible`, `due_at`).
   - Created a `validateData()` function to perform checks on the course, assignments, and learner submissions. This function validates:
     - Whether the `course_id` in the assignment matches the course provided.
     - Whether `points_possible` is a valid number and within the acceptable range.
     - Whether dates (`due_at` and `submitted_at`) are in the correct format and valid.
     - Whether learner submissions contain valid scores and submission dates, and that they aren't in the future.

2. **Data Parsing and Comparison Functions:**

   - Created helper functions to handle date comparisons:
     - `isCorrectFormatDate()` checks if a date is in the `yyyy-mm-dd` or `yyyy/mm/dd` format and if it's a valid date.
     - `greaterThanToday()` checks if a date is in the future (which would indicate invalid data).
     - `isAssignmentDue()` checks if an assignment is due based on the current date.
     - `isAssignmentLate()` compares submission date and due date to determine if the assignment was submitted late.

3. **Score Calculation Logic:**

   - Defined the function `calculateAssigmentScore()` to adjust the score for late submissions by deducting 10% of the assignment's total points if the submission is late.
   - Implemented the `calculateAverageScorePerAssigmnet()` function to calculate and return the average score for each assignment, rounded to three decimal places.

4. **Calculate Result :**

   - Created logic to iterate over each learner and each assignment within the `AssignmentGroup`.
   - For each assignment that is due, checked if a learner has submitted their work. If so, calculated the score using `calculateAssigmentScore()`, adjusted for any late penalties.
   - Calculated the total score for each learner across all assignments and used this to compute their average score.
   - Stored the results in an array, associating each learner with their average score and individual assignment scores.

5. **Error Handling:**

   - Wrapped the logic in a `try/catch` block to catch any errors during the validation and computation process.

6. **Print the Final Result:**
   - Once all data was validated and computations were completed, the final result was stored in the `result` variable, which contains an array of learner data, including their average score and individual assignment scores.
   - return the result aa a output for the function
   - call the main function and get the output then print the result to the terminal.

---

## Reflection

### 1. What could you have done differently during the planning stages of your project to make the execution easier?

- Make it read form file all this information to be easier and user firendly.
- Build a unit test so every time I cnahge the code I will check if is correct or not.
- Show the output to the user on the webpage not in console.

### 2. Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?

- No.

### 3. What would you add to, or change about your application if given more time?

- Add more validation
- Add unit tests.

---
