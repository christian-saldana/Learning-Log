# Learning Log
Link to project: [Learning Log](https://learning-log-project2021.herokuapp.com/).
If you do not want to register an account you can use the demo account Username: demo, Password: demo@demo

I completed this project from scratch with a Django backend and React frontend. The web application features create, read, update, and delete functionality in addition to authorization and authentication that are powered by the Django Rest Framework. React Hooks was utilized to manage state in the application and the Bootstrap framework was used to style the user interface. Finally, I hosted the web application onto Heroku.

## Images of the application
This is the home page where the user can either register an account or login.
![Home Page](/images/image_index.PNG)
In this page users can create new topics that they are currently learning.
    ![Topics](/images/image_topics.PNG)
    Here users can add entries to keep track of their learning. It also records when they entered the entry so users can see their progress.
    ![Entries](/images/image_entries.PNG)

## Ongoing work
I am currently developing the user profile so that it is displayed on the topics page. In the future I want to replace the current SQLite database with a PostgreSQL database and use AWS to host. Possibly incorporate Docker and GitLab for CI/CD.