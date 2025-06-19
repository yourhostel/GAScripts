function GetSubmissions() {
    const token = ScriptApp.getOAuthToken();
    const courseId = "769...";
    const courseWorkId = "769...";

    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${courseWorkId}/studentSubmissions`;

    const response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    Logger.log(response.getContentText());
}