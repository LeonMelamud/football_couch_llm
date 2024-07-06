// chatConstants.js

const CHAT_CONSTANTS = {
    // טקסטים בעברית
    COACH_CHAT_TITLE: 'שיחה עם המאמן',
    INPUT_PLACEHOLDER: 'הקלד הודעה...',
    SEND_BUTTON_TEXT: 'שלח',
    API_KEY_PROMPT: 'אנא הכנס מפתח API עבור ',
    API_KEY_MISSING_ALERT: 'לא הוזן מפתח API. לא ניתן להשתמש בצ\'אט ללא מפתח.',
    ERROR_MESSAGE: 'מצטער, אירעה שגיאה. אנא בדוק את מפתח ה-API שלך ונסה שוב.',
    API_KEY_REQUEST_MESSAGE: 'אנא הזן את מפתח ה-API שלך עבור {MODEL}:',
    API_KEY_SUBMIT: 'שלח מפתח',

    API_KEY_CHECKING: 'בודק את תקינות המפתח עבור {MODEL}...',
    API_KEY_SUCCESS: 'מפתח ה-API אומת בהצלחה. אתה יכול להתחיל לשוחח עם המאמן.',
    API_KEY_FAILURE: 'המפתח שהוזן אינו תקין או שאירעה שגיאה בבדיקה. אנא נסה שנית.',

 
    // Prompts למודלים השונים
    SYSTEM_PROMPT: "אתה מאמן כדורגל מנוסה שמסביר על חלוקת קבוצות.",
    CLAUDE_PROMPT: "As an experienced soccer coach explaining team divisions,",
    PALM_PROMPT: "You are an experienced soccer coach explaining team divisions.",

    // טקסט להסבר הקבוצות
    EXPLAIN_TEAMS_PROMPT: "הנה הקבוצות שנוצרו:\n{teamsExplanation}\n\nהאם תוכל להסביר את החלוקה הזו ולתת טיפים לשיפור?"
};

window.CHAT_CONSTANTS = CHAT_CONSTANTS;