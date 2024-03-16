# Library Management System

Welcome to our Library Management System! This project is designed to help libraries efficiently manage their resources and provide users with a seamless borrowing experience. Below, we'll provide an overview of the functionalities, technologies used, and how to run the project.

## Functionalities

### User Roles

- **Admin**: The admin has access to functionalities like adding/deleting books, managing users, and monitoring the system.
- **User**: Users can browse the available books, borrow books, and manage their account details.

### Authentication

- Both admins and users can register and log in to access their respective functionalities.
- Authentication is handled securely to ensure user data safety.

### Book Management

- Admins can add new books to the system, delete existing books, and update book details such as title, author, and availability.
- Users can view the list of available books, search for specific titles or authors, and see details about each book.

### Borrowing

- Users can borrow books by selecting them from the available options.
- The system automatically updates the availability status of books when they are borrowed or returned.

## Technologies Used

- **Spring Boot**: The backend of the application is built using Spring Boot, providing a powerful and streamlined framework for building Java-based applications.
- **Hibernate**: Hibernate is used as the ORM (Object-Relational Mapping) tool to facilitate interaction with the database.
- **HTML/CSS/JavaScript**: The frontend interface is developed using HTML for structure, CSS for styling, and JavaScript for interactivity.
- **Spring Security**: Spring Security is used for secure authentication and authorization.
- **PostgreSQL**: PostgreSQL is used as the relational database management system to store information about books, users, and borrowing history.



## Additional Notes

- Implement proper validation for user inputs.
- Handle errors and edge cases gracefully.
- Enhance the UI/UX for better user experience.
- Implement pagination for book lists if dealing with a large number of records.
- Add login and signup pages for users. Admin functionalities should be accessible after admin login.
- Implement functionalities for adding books to the user's reading list.



## Running the Project

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Make sure you have PostgreSQL installed and running on your machine.
4. Set up the database by running the SQL scripts provided in the project.
5. Configure the database connection properties in the application.properties file.
6. Build the project using Maven or your preferred build tool.
7. Run the Spring Boot application.
8. Open your web browser and navigate to the specified localhost port to access the application.

## Conclusion

Our Library Management System provides a user-friendly interface for both admins and users to efficiently manage library resources. With features like book management, user authentication, and borrowing capabilities, this system aims to streamline library operations and enhance the borrowing experience for users. Built with Spring Boot, Hibernate, HTML, CSS, JavaScript, and PostgreSQL, it offers a robust and scalable solution for libraries of all sizes.

## Contributors

- Harsh Gor

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
