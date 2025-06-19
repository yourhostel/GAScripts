function getUserEmail() {
    const userId = "112...";
    const token = ScriptApp.getOAuthToken();
    const url = `https://classroom.googleapis.com/v1/userProfiles/${userId}`;

    const response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const data = JSON.parse(response.getContentText());
    Logger.log(response.getContentText());
    Logger.log(userId + " → " + data.emailAddress);
}