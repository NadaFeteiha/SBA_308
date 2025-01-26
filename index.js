// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023/01/25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// TODO: If an AssignmentGroup does not belong to its course (mismatching course_id) throw an error
// You should also account for potential errors in the data that your program receives. 
// What if points_possible is 0? You cannot divide by zero. 
// Use try/catch and other logic to handle these types of errors gracefully.

// If an assignment is not yet due, do not include it in the results or the average.
// Additionally, if the learner’s submission is late (submitted_at is past due_at), 
// deduct 10 percent of the total points possible from their score for that assignment.

const MAX_ASSIGNMENT_POINTS = 1000;

function getLearnerData(course, AssignmentGp, submissions) {

    // validate input 
    function validateData() {

        // validate CourseInfo
        if (course.id !== undefined && AssignmentGp.course_id !== undefined && AssignmentGp.course_id !== course.id) {
            throw new Error('Invalid input: AssignmentGroup does not belong to the course');
        }

        // validate AssignmentGroup 
        AssignmentGp.assignments.forEach(
            assignment => {
                // validate points_possible
                if (assignment.points_possible == undefined || assignment.points_possible <= 0 || assignment.points_possible > MAX_ASSIGNMENT_POINTS) {
                    throw new Error(`Invalid input: points_possible is ${assignment.points_possible}`);
                }

                // validate due_at
                if (assignment.due_at == undefined || !isCorrectFormatDate(assignment.due_at)) {
                    throw new Error(`Invalid input: due_at is ${assignment.due_at}`);
                }
            });

        // validate LearnerSubmissions
        submissions.forEach(
            submission => {
                // validate score
                if (submission.submission.score == undefined || submission.submission.score > MAX_ASSIGNMENT_POINTS) {
                    throw new Error('Invalid input: score');
                }

                // validate submitted_at
                if (submission.submission.submitted_at == undefined || !isCorrectFormatDate(submission.submission.submitted_at)) {
                    throw new Error(`Invalid input: submitted_at is ${submission.submission.submitted_at}`);
                }
            });

        // Validate learnerSubmissions data
        LearnerSubmissions.forEach(submission => {
            // check if the learner_id and assignment_id are numbers
            if (typeof submission.learner_id !== "number" || typeof submission.assignment_id !== "number") {
                throw new Error("Invalid LearnerSubmission data.");
            } // check if the submission is an object
            else if (submission.submission === undefined || submission.submission.submitted_at === undefined || submission.submission.score === undefined) {
                throw new Error("Invalid LearnerSubmission data.");
            }// check if the score is a number and is between 0 and Max points
            else if (typeof submission.submission.score !== "number" || submission.submission.score < 0 || submission.submission.score > MAX_ASSIGNMENT_POINTS) {
                throw new Error("Invalid LearnerSubmission data.");
            } // check if the date is in the correct format
            else if (!isCorrectFormatDate(submission.submission.submitted_at)) {
                throw new Error("Invalid LearnerSubmission data.");
            } // check if submitted_at is not greater than today!! 
            // not make sense that student submit in the future !!
            else if (greaterThanToday(submission.submission.submitted_at)) {
                throw new Error("Invalid LearnerSubmission data.");
            }
        });
    }

    function greaterThanToday(strDat) {
        let today = new Date();
        let date = new Date(strDat);
        return date > today;
    }
    // check if the date is in the correct format
    function isCorrectFormatDate(date) {
        // check if the date is in the format yyyy-mm-dd or yyyy/mm/dd and is a valid date
        return (date.match(/^\d{4}-\d{2}-\d{2}$/) !== null || date.match(/^\d{4}\/\d{2}\/\d{2}$/) !== null) && !isNaN(new Date(date).getTime());
    }

    // Get the learner submission for each assignment in the AssignmentGroup
    function getLearnerSubmission(learnerId, assignmentId) {
        return submissions.find(submission => submission.learner_id === learnerId && submission.assignment_id === assignmentId);
    }

    // check if the assignment is due
    function isAssignmentDue(assignment) {
        const dueDate = new Date(assignment.due_at);
        const currentDate = new Date();
        return currentDate >= dueDate;
    }

    // check if the assignment is late than given due date
    function isAssignmentLate(submissionDate, DueDate) {
        const submission = new Date(submissionDate);
        const dueDate = new Date(DueDate);
        return submission > dueDate;
    }

    // calculate the average score for each assignment and round to 3 decimal places
    function calculateAverageScorePerAssigmnet(learnerScore, maxPointScore) {
        let averageScore = (learnerScore / maxPointScore);
        return parseFloat(averageScore.toFixed(3));
    }

    // calculate the score for the assignment 
    function calculateAssigmentScore(assignment, submission) {
        let score = submission.score;
        if (isAssignmentLate(submission.submitted_at, assignment.due_at)) {
            score -= 0.1 * assignment.points_possible;
        }
        return score;
    }

    try {
        // First, validate the data
        validateData();

        // Second, filter out the assignments 
        const assignments = AssignmentGp.assignments.filter(assignment => isAssignmentDue(assignment));

        // Third, get the list of learners ids
        const learners = [];
        LearnerSubmissions.forEach(submission => {
            if (learners.length === 0 || !learners.includes(submission.learner_id)) {
                learners.push(submission.learner_id);
            }
        });

        // Fourth: calculate the average score for each learner 
        const result = [];
        learners.forEach(learner => {
            let learnerData = {
                learner_id: learner,
                average: 0
            };

            let totalLearnerScore = 0;
            let totalMaxScore = 0;

            assignments.forEach(assignment => {
                const submission = getLearnerSubmission(learner, assignment.id);
                if (submission) {
                    // calculate the score for the assignment see if it is late
                    let assignmentScore = calculateAssigmentScore(assignment, submission.submission);
                    learnerData[assignment.id] = calculateAverageScorePerAssigmnet(assignmentScore, assignment.points_possible);

                    // calculate the total score for the learner
                    totalLearnerScore += assignmentScore;
                    totalMaxScore += assignment.points_possible;
                }
            });

            learnerData.average = calculateAverageScorePerAssigmnet(totalLearnerScore, totalMaxScore);
            result.push(learnerData);
        });
        return result;
    } catch (error) {
        return (`Error: ${error.message}`);
    }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);


