var sessionOptions = {
    
    //currentUser : new User(),
}
var urlOptions = {
    host: 'http://localhost:8080',
    loginPath: '/api/login',
    rolePath: '/api/roles',
    userPath: '/api/accounts',
    topicPath: '/api/topics',
    recruitmentPath : '/api/recruitments',
    fileUploadPath: '/api/files',
    pagePath: '/api/pagination',
    logoutPath: '/api/logout',
    mePath: '/api/accounts/me',
    eventPath: '/api/events',
    attendeePath: '/api/attendees',
    labelPath: '/api/labels',
}
let editorOptions = {
    imageUploadParam: 'file',
    imageUploadMethod: 'POST',
    imageMaxSize: 10 * 1024 * 1024,                  //5MB
    imageUploadURL: `${urlOptions.host}${urlOptions.fileUploadPath}`,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],

    fileUploadParam: 'file',
    fileUploadMethod: 'POST',
    fileMaxSize: 10 * 1024 * 1024,                  //10MB
    fileUploadURL: `${urlOptions.host}${urlOptions.fileUploadPath}`,
    //fileAllowedTypes: ['*'],
    requestHeaders: {
        authorization:''
    },
    videoUpload: false,
    height: '500',
    events: {
        /*'froalaEditor.image.beforeUpload': function (e, editor, images) {
        //  console.log("abcd");
        }*/
    },
}

export const CONFIGS = {
    editorOptions: editorOptions,
    urlOptions: urlOptions,
    sessionOptions : sessionOptions,
}