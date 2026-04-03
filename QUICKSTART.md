# Quick Start Guide - Quizapp

## 🚀 Get Started in 30 Seconds

### Option 1: Using the Start Script (Recommended)

#### macOS / Linux
```bash
# Make script executable
chmod +x start-server.sh

# Run the server
./start-server.sh

# Or with custom port
./start-server.sh 3000
```

#### Windows
```cmd
# Run the batch file
start-server.bat

REM Or with custom port and host
start-server.bat 3000 localhost
```

### Option 2: Manual Start

#### macOS / Linux
```bash
cd src/web
php -S localhost:8000
```

#### Windows
```cmd
cd src\web
php -S localhost:8000
```

### Option 3: Using Docker (if available)

```bash
docker run -d -p 8000:8000 -v $(pwd)/src/web:/app php:7.4-cli php -S 0.0.0.0:8000
```

## 📱 Access the Application

Once the server is running, open in your browser:

```
http://localhost:8000
```

Or with custom port:
```
http://localhost:3000
```

## 🎯 What to Try

1. **Start Quiz**: Click "Start Quiz" button
2. **Answer Questions**: Select answers for each question
3. **Navigate**: Use Previous/Next buttons
4. **Review Results**: See your score and detailed feedback

## 📁 Project Structure Quick Reference

```
Quizapp/
├── src/web/          ← Frontend files (open in browser)
├── src/server/       ← Backend API files
├── data/             ← Auto-created database
└── *.md              ← Documentation files
```

## 🔧 Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Port already in use | Use different port: `./start-server.sh 3000` |
| PHP not found | Install PHP or check PATH |
| Database errors | Delete `data/quiz.db` and reload |
| CORS errors | Check API endpoint URL in script.js |

## 📚 Learn More

- **Full Setup**: Read [SETUP.md](SETUP.md)
- **Admin Features**: Read [ADMIN.md](ADMIN.md)
- **Main README**: Read [README.md](README.md)

## 💡 Tips

- Keep the terminal open while developing
- Check browser console (F12) for errors
- API responses appear in Network tab
- Database auto-initializes with sample data

## ⌨️ Keyboard Shortcuts

While using the quiz:
- **Tab**: Navigate between buttons
- **Enter**: Select answer (when focused)
- **Click**: Select answer directly

## 🐛 Still Having Issues?

1. Check terminal output for error messages
2. Open browser console (F12) for JavaScript errors
3. Look in `data/error.log` for PHP errors
4. Verify PHP version is 7.2 or higher: `php -v`

---

**Happy quizzing!** 🎓
