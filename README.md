# NotesApp 📝

A feature-rich mobile notes application built with React Native and Expo. Create, organize, and manage your notes with ease using categories, search functionality, and a clean, intuitive interface.

## Features ✨

- **User Authentication** - Secure signup and login system
- **Create Notes** - Add notes with titles, content, and categories
- **Organize by Category** - Categorize notes (Personal, Work, Ideas, Important)
- **Search Notes** - Find notes quickly with the search functionality
- **Edit Notes** - Update existing notes anytime
- **Delete Notes** - Remove notes you no longer need
- **User Profile** - View and manage your profile information
- **Persistent Storage** - All data is securely stored locally using AsyncStorage
- **Responsive Design** - Beautiful UI that works on all mobile devices

## Tech Stack 🛠️

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and runtime
- **React Navigation** - Navigation library for React Native
- **AsyncStorage** - Local data persistence
- **Ionicons** - Beautiful icon library

## Project Structure 📁

```
react-native-notes-app/
├── src/
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   ├── SignupScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Notes/
│   │   │   ├── NotesListScreen.js
│   │   │   ├── AddNoteScreen.js
│   │   │   ├── EditNoteScreen.js
│   │   │   └── NoteDetailScreen.js
│   │   └── Profile/
│   │       └── ProfileScreen.js
│   ├── navigation/
│   │   ├── RootNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── AppNavigator.js
│   ├── components/
│   │   ├── Button.js
│   │   ├── CategoryTabs.js
│   │   ├── NoteCard.js
│   │   └── SearchBar.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── validation.js
│   ├── constants/
│   │   ├── categories.js
│   │   └── colors.js
│   └── context/
│       └── AuthContext.js
├── assets/
├── App.js
├── app.json
└── package.json
```

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-native-notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on a device or simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Or scan the QR code with Expo Go app on your mobile device

## Usage 📱

### Creating an Account

1. Launch the app
2. Tap "Signup" on the login screen
3. Enter your name, email, and password
4. Tap "Create Account"

### Creating a Note

1. Log in to your account
2. Navigate to the Notes tab
3. Tap the "+" button
4. Enter note title (optional) and content
5. Select a category
6. Tap "Save Note"

### Managing Notes

- **View Note**: Tap any note in the list to see full details
- **Edit Note**: Open a note and tap edit to modify it
- **Delete Note**: Tap the trash icon on a note card
- **Search Notes**: Use the search bar at the top (if available)

### Managing Your Profile

1. Tap the Profile tab
2. View your account information
3. Tap "Logout" to sign out

## Key Features Explained 🎯

### Authentication

- Secure user registration with email validation
- Password-protected login
- Automatic session management

### Notes Management

- Store unlimited notes locally
- Each note includes:
  - Title (optional)
  - Content (required)
  - Category
  - Creation and update timestamps

### Categories

Available note categories:

- Personal
- Work
- Ideas
- Important

### Data Persistence

- All user data stored locally using AsyncStorage
- No cloud dependency - your data stays on your device
- Automatic data synchronization

## Troubleshooting 🔧

### Issue: "User not found" when creating notes

- **Solution**: Make sure you're logged in. Try logging out and logging back in.

### Issue: Asset not found errors

- **Solution**: Clear Expo cache and restart with `npx expo start --clear`

### Issue: Notes not appearing

- **Solution**:
  1. Check that you're logged in
  2. Ensure you created notes while logged in
  3. Pull down to refresh the notes list

### Issue: App crashes on startup

- **Solution**:
  1. Clear AsyncStorage by uninstalling and reinstalling the app
  2. Check console for specific error messages

## Development 👨‍💻

### Running Tests

```bash
npm test
```

### Building for Production

**Android:**

```bash
eas build --platform android
```

**iOS:**

```bash
eas build --platform ios
```

### Code Style

The project follows React Native best practices and uses consistent formatting.

## Security Notes 🔒

- Passwords are stored locally - never share your credentials
- Data is stored unencrypted on device - ensure physical device security
- For production, consider implementing encryption for sensitive data

## Future Enhancements 🚀

- [ ] Cloud synchronization
- [ ] Note sharing between users
- [ ] Rich text formatting
- [ ] Image attachments
- [ ] Voice notes
- [ ] Reminders and notifications
- [ ] Dark mode support
- [ ] Export notes as PDF

## Contributing 🤝

Contributions are welcome! Please feel free to submit pull requests or report issues.

## License 📄

This project is open source and available under the MIT License.

## Support 💬

For issues, questions, or suggestions, please open an issue on the project repository.

## Changelog 📋

### Version 1.0.0

- Initial release
- User authentication
- Note creation, editing, and deletion
- Category organization
- User profile management

