# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

PROBLEMS I RAN IN TO
- I didn't do much of an outline like I should have done

- First problem for me was rendering the info to the DOM, it was undefined in "task" and "description didn't show
    -to solve this problems I console both in router side "req.body" and found that missed spell couple of words

- The problem I stuck for the longest is the changing the status of the task, for awhile the task status keep changing to NULL
    - I put in NOT NULL in the SQL table and an error popped up again in terminal saying there's a conflict between my NOT NULL
    setting, I know my status still keep changing to NULL.  
    - I finally found that because I put in the wrong data: {} on the client side

- I research how to record time when task is completed and I can't implement it into the function.

- CSS styling is hard
    - Making the page presentable I can do
    - But trying to visualize what a great/awesome font-end look like is really hard


## Installation

1. Database.sql have my queries, just copy and create a table in postico
2. I installed nodemon, body-parser, pg, express.
3. I src in sweetalert2 and bootstrap
    - //cdn.jsdelivr.net/npm/sweetalert2@11
    - https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css

## Usage

1. You need to fill out task title and descriptions for the Add button to work
2. After a task is created it, it will render to the bottom table
3. If you have a lot tasks in your the table, you can use the "Filter Tasks by Name" to find the one you want
4. There is two thing added with the task you created, one is the checkbox = "No" in completed column and one Delete button next to it
5. To use the Delete button you have to checked the No to turn it to Yes that is when the background color of that row will turn GREEN
6. Now you can delete the completed task, another window will pop out to ask if you are sure this task is completed? then if you confirmed it will delete both task on front end and in database.



Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
