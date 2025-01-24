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
            due_at: "2023-01-25",
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

function getLearnerData(course, AssignmentGp, submissions) {
    // Validate input to ensure that the AssignmentGroup belongs to the course
    if (AssignmentGp.course_id !== course.id) {
        throw new Error('Invalid input: AssignmentGroup does not belong to the course');
    }


    // Get the learner submission for each assignment in the AssignmentGroup
    function getLearnerSubmission(learnerId, assignmentId) {
        return submissions.find(submission => submission.learner_id === learnerId && submission.assignment_id === assignmentId);
    }

    let LearnerSubmissions = [];

    for (let submission of submissions) {
        const assignment = AssignmentGp.assignments.find(assignment => assignment.id === submission.assignment_id);

        if (assignment && assignment.points_possible > 0) {
            const learnerSubmission = getLearnerSubmission(submission.learner_id, submission.assignment_id);
            if (learnerSubmission) {
                LearnerSubmissions.push({
                    learner_id: submission.learner_id,
                    assignment_id: submission.assignment_id,
                    submission: learnerSubmission.submission
                });
            }
        } else {
            console.log(`Invalid input: ${assignment.name} has points_possible ${assignment.points_possible}`);
        }
    }


    return LearnerSubmissions;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
