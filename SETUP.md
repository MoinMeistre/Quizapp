# Quizapp - Web Programming Module

A full-stack quiz application built with HTML/CSS/JavaScript frontend and PHP backend.

## Project Structure

```
Quizapp/
├── src/
│   ├── web/                 # Frontend files
│   │   ├── index.php        # Main HTML structure
│   │   ├── styles.css       # CSS styling
│   │   └── script.js        # Frontend JavaScript logic
│   └── server/              # Backend files
│       ├── api.php          # Main API endpoint
│       ├── config.php       # Database configuration
│       └── quiz_handler.php # Quiz business logic
├── data/                    # Data directory (auto-created)
│   └── quiz.db              # SQLite database (auto-created)
└── README.md
```

## Features

### Frontend
- **Responsive Design**: Mobile-friendly interface
- **Interactive Quiz**: Click to select answers
- **Progress Tracking**: Visual progress bar during quiz
- **Review Results**: Detailed feedback on answers
- **Navigation**: Previous/Next buttons to review answers

### Backend
- **RESTful API**: GET/POST endpoints for quiz operations
- **SQLite Database**: Automatic database initialization with sample data
- **Error Handling**: Comprehensive error management
- **Result Storage**: Save and retrieve quiz results
- **Statistics**: Track user performance metrics

## Setup Instructions

### Requirements
- PHP 7.2 or higher
- SQLite3 (usually included with PHP)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Quizapp
   ```

2. **Set up local server (using PHP built-in server)**
   ```bash
   cd src/web
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Alternative: Using Apache/Nginx

For Apache, create a virtual host pointing to the `src/web` directory and ensure:
- `mod_rewrite` is enabled
- `.htaccess` files are allowed
- PHP is configured correctly

For Nginx, configure the server block to point to `src/web` with PHP-FPM.

## API Endpoints

### Get Questions
- **URL**: `/api.php?action=getQuestions`
- **Method**: GET
- **Response**: JSON array of all quiz questions

### Get Question Details
- **URL**: `/api.php?action=getQuestionDetails&id=1`
- **Method**: GET
- **Response**: Single question details

### Submit Answers
- **URL**: `/api.php?action=submitAnswers`
- **Method**: POST
- **Parameters**: `answers[]` array of selected answer indices
- **Response**: Score, results, and feedback

### Health Check
- **URL**: `/api.php?action=health`
- **Method**: GET
- **Response**: API status and timestamp

## Database

The application uses SQLite3 database which is automatically created and initialized with sample questions on first run.

### Tables

**questions**
- `id`: Question ID
- `question_text`: The question
- `option_a`, `option_b`, `option_c`, `option_d`: Answer options
- `correct_answer`: Index of correct answer (1-4)
- `category`: Question category
- `difficulty`: Question difficulty level
- `created_at`: Timestamp

**results**
- `id`: Result ID
- `user_id`: User identifier
- `score`: Score achieved
- `total_questions`: Total questions in quiz
- `percentage`: Percentage score
- `answers`: JSON of selected answers
- `completed_at`: Timestamp

**user_sessions**
- `id`: Session ID
- `session_id`: Unique session identifier
- `created_at`: Session creation time
- `last_activity`: Last activity timestamp

## Adding Questions

Questions are automatically populated from seed data. To add additional questions programmatically, use the API or modify the seed data in `config.php`.

## Customization

### Styling
Edit `src/web/styles.css` to change colors, fonts, and layout:
- Modify CSS variables in `:root` selector
- Update component-specific styles

### Questions
Edit the `seedSampleData()` function in `src/server/config.php` to add/modify questions.

### Frontend Logic
Edit `src/web/script.js` to modify quiz behavior and functionality.

## File Permissions

Ensure the `data/` directory is writable for SQLite database operations:
```bash
chmod 755 data/
```

## Troubleshooting

### Database errors
- Check that `data/` directory exists and is writable
- Verify PHP has SQLite3 extension enabled
- Check error logs in `data/error.log`

### API not responding
- Verify API endpoint paths are correct
- Check browser console for CORS or network errors
- Ensure PHP server is running

### Questions not loading
- Check browser console for JavaScript errors
- Verify API response in Network tab
- Confirm database is initialized properly

## Browser Support

- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- Mobile browsers: ✓ (Responsive design)

## Authors

- Felix Klaz
- Philipp Daun

## License

This project is part of the Web Programming Module in Kazakhstan.
