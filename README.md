# OnlineLearningPlatform
Online Learning Platform Documentation
Table of Contents
1.	Introduction
2.	Getting Started
-	Registration and Login
-	User Proﬁle
3.	Course Management
-	Course Catalog
-	Enrollment
-	Progress Tracking
4.	Frontend Development
5.	Backend Development
6.	User Interface
7.	Security
8.	Appendix

1.	Introduction
This guide provides an overview of the platform's features and instructions for users.

2.	Getting Started
Registration and Login
To get started, you need to create an account and log in to access courses.

Registration
1.	Click on the "Sign Up" button.
2.	Fill in your ﬁrst name(optional), last name(optional), username, email(optional), and password.
3.	Click "Register" to create your account.

Login
1.	Enter your username and password.
2.	Click on the "Login" button to access your account.

User Proﬁle
Once logged in, you can manage your proﬁle information, including your name and email.

3.	Course Management
Course Catalog
Browse available courses, view details, and enroll in courses. Viewing Courses
 
1.	Navigate to the "Course Catalog" section.
2.	Browse through the list of available courses.
3.	Click on a course to view its details.

Enrollment
Track your enrolled courses and monitor your progress.

Enrolling in a Course
1.	Find the course you want to enroll in.
2.	Click the "Enroll" button.
3.	You are now enrolled in the course.

Progress Tracking
1.	In the "My Courses" section, view your enrolled courses.
2.	Check your course progress and completion percentage.

4. Frontend Development

React-based web application was implemented. Overall, the code reﬂects a web application that allows users to explore and consume course content. It also provides course management capabilities for authorized users and showcases customer reviews on the homepage. The application utilizes Material-UI for its user interface components and Axios for making API requests.

1.	AllCourses Component:
-	This component is responsible for displaying a list of courses.
-	It fetches course data from a speciﬁed URL using Axios when the component mounts.
-	The fetched course data is displayed in a grid layout using Material-UI components.
-	Each course is represented by a "CourseCard" component.
-	It also includes a header with a background gradient and a footer section.

2.	ConsumeContent Component:
-	This component appears to be part of a course content consumption page.
-	It features a video player on the right side and a vertical stepper on the led side.
-	Users can navigate through diﬀerent sections of the course content using the stepper.
-	Upon completing the course content, there is a completion message and an option to go to the user's courses.

3.	CourseCRUD Component:
-	This component is used for creating, reading, updating, and deleting course information.
-	It follows a multi-step form approach with diﬀerent sections for course information, content, and ﬁnalization.
 
-	The user's authorization status is checked, and unauthorized users are informed.
-	The component displays diﬀerent forms and actions depending on the active step in the process.

4.	Home Component:
-	This is the homepage of the web application.
-	It features a large banner with a call to action to log in or sign up.
-	The homepage also includes customer reviews displayed in a grid format.
-	Each review contains a name, comment, and an image.

5.	InstructorProﬁlePage:
-	Description: This component represents the instructor's proﬁle page. It displays information about the instructor, such as their name, email, and published courses. In addition, instructors can edit their proﬁles if they are authorized.
-	Features:
-	Display instructor information.
-	Display a list of published courses.
-	Allow authorized instructors to edit their proﬁles.

6.	InstructorSignUp:
-	Description: This component provides a registration form for instructors to create an account. Instructors can provide their ﬁrst name, last name, username, and password. It also handles the registration process, including error handling and success messages.
-	Features:
-	Registration form for instructors.
-	Validation and error handling.
-	Success message on successful registration.

7.	Login:
-	Description: This component is responsible for the login functionality. Users can enter their username and password to log in. It also handles error messages and provides a link to reset the password or sign up for a new account.
-	Features:
-	User login form.
-	Validation and error handling.
-	Success message on successful login.
-	Links for password reset and registration.

8.	Search:
-	Description: This component is for searching and displaying a list of courses based on search criteria. It includes a search input ﬁeld and displays matching courses as cards. It also allows for pre-populating the search results based on predeﬁned search values.
 
-	Features:
-	Course search functionality.
-	Display search results as course cards.
-	Predeﬁned search based on parameters.

9.	CSS (LoginSignUp.css):
-	Description: This CSS ﬁle contains styles used for the login and registration components. It deﬁnes the appearance and layout of the login and registration pages, including button styles, backgrounds, and form styles.

10.	SignUp:
-	Description: This component serves as a registration form for students. It allows users to sign up by providing their ﬁrst name, last name, username, and password. The component includes validation, error handling, and success messages upon successful registration.
-	Features:
-	Registration form for students.
-	Validation and error handling.
-	Success message on successful registration.
-	Password conﬁrmation for matching passwords.
-	Links for instructor registration and login.

11.	StudentProﬁlePage:
-	Description: This component represents the student's proﬁle page. It displays information about the student, such as their name, email, and enrolled courses. Additionally, students can edit their proﬁles if they are authorized to do so.
-	Features:
-	Display student information.
-	Display a list of enrolled courses.
-	Allow authorized students to edit their proﬁles.

5. Backend Development

Backend Description:

It is built using ASP.NET Core and focuses on user management, course management, and administrative functionalities. The code is divided into controllers, each responsible for handling speciﬁc HTTP requests and routes. The backend code incorporates ASP.NET Identity for user management, JWT token authentication for securing API routes, and AutoMapper for object mapping. It's designed to support an online learning platform with user registration, course management, and administrative control.
 

1.	AccountController:
-	Responsible for user registration and login.
-	Implements user registration with roles (member or lecturer) and handles validation.
-	Provides user login functionality with token generation.

2.	AdminController:
-	Manages administrative tasks.
-	Requires authentication with admin role (handled by policies).
-	Allows admins to view users with their roles and edit user roles.

3.	BaseApiController:
-	A base class for other controllers, providing common conﬁgurations and settings.

4.	CourseController:
-	Manages courses and course-related operations.
-	Provides endpoints to get all courses, get a speciﬁc course, get all courses for a lecturer, add a course to a user, update a course, and delete a course.
-	Contains logic for course CRUD operations, including data mapping and modiﬁcation.

5.	EnrollmentController:
-	Manages enrollments of users in courses.
-	Endpoints:
-	`GET /enrollment/{id:int}`: Retrieves enrollment information by its ID.
-	`GET /enrollment/user/{username}`: Retrieves all enrollments for a user based on their username.
-	`POST /enrollment/{courseId:int}`: Adds an enrollment for a user in a speciﬁc course.
-	`PUT`: Updates enrollment details.
-	Handles enrollment-related operations, including fetching individual enrollments, listing all enrollments for a user, creating new enrollments for courses, and updating enrollment information.

6.	UsersController:
-	Manages user-related operations.
-	Endpoints:
-	`GET`: Retrieves a list of members (users) and their details.
-	`GET /{username}`: Retrieves a member's details by their username.
-	`PUT`: Updates user details.
-	Deals with user management and allows retrieving member details, listing members, and updating member information. It is responsible for CRUD operations related to users.
 
6.	Security

1.	User Authentication and Authorization:

-	Authentication: Users are required to have secure login credentials, including a username and password. Passwords are stored securely as hashes.
-	Authorization: Role-based access control (RBAC) is implemented to manage user permissions. Diﬀerent roles, such as "Admin," "Instructor," and "Member," have access to speciﬁc functionalities and data.

2.	Data Protection:

-	Sensitive data, like passwords and personal information, is encrypted to prevent unauthorized access.
-	Data transmission is secured using HTTPS to protect information in transit.

3.	Secure Coding Practices:

-	The platform follows secure coding practices, adhering to industry-standard security guidelines and best practices to minimize vulnerabilities.
 

4.	Input Validation:

-	User inputs are rigorously validated to prevent malicious inputs, which can lead to security breaches. This ensures that only safe and expected data is processed.
5.	Security Headers:

-	Security headers are implemented in web responses to enhance security. These headers help protect against various types of attacks, such as cross-site scripting (XSS) and clickjacking.

7.	Compliance:

- The platform complies with relevant data protection regulations and standards to ensure the privacy and security of user data.

By implementing these security measures, our Online Learning Platform aims to provide a safe and secure environment for both users and their data.

7.	Appendix
Glossary
-	Admin: Administrative role with system-wide access.
-	Instructor: Role for course creators and instructors.
-	Member: Role for learners who enroll in courses.
