function getCourseWork() {
    const token = ScriptApp.getOAuthToken();
    const courseId = "769..."; // ID курса
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`;

    const response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    Logger.log(response.getContentText());
}