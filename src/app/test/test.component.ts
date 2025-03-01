
import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {finalize, from, Observable, tap} from "rxjs";
import 'firebase/storage';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
//import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from "@angular/fire/storage";
import { Chat2Service } from 'app/services/chat/chat2.service';
import { Chat } from 'app/models/chat/chat';
import { Message } from 'app/models/chat/message';
import { User } from 'app/models/chat/user';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { UserService } from 'app/services/chat/user.service';
import * as firebase from 'firebase/compat';
import Recorder from 'recorder-js';
import { Track } from 'ngx-audio-player'; 
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingServicee } from 'app/services/audio-recording.service';
import { VideoRecordingService } from 'app/services/video-recording.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewChecked{
  mssapDisplayTitle = true;
mssapDisablePositionSlider = true;
mssapDisplayRepeatControls = true;
mssapDisplayVolumeControls = true;
mssapDisplayVolumeSlider = false;
   
// Material Style Simple Audio Player
mssapPlaylist: Track[] = [
  {
    title: 'Audio Title',
    link: 'Link to Audio URL',
    artist: 'Audio Artist',
  //  duration: 'Audio Duration in seconds'
  }
];

// For Streaming Audio From URL 
// set mediaType = 'stream' 

  selectedFile: File | null = null;
  imageUrl: string | null = null;
  isItemClicked = false;
  selectedChatId: number | undefined;
  chats: Chat[] | undefined;
  messages: Message[] | undefined;
  showMenu: boolean = false;
  messageContent: string = '';
  filteredMessages: any[] = [];
  searchText: string = '';
  searchUser: string = '';
  searchResults: User[] = [];
  isTyping: boolean = false;
  typingTimer : any;
  user: User | undefined;
  public alluser: any = [];
  @ViewChild('listContainer') listContainer!: ElementRef;


  constructor(   private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingServicee,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,private userService: UserService,private tokenStorageService: TokenStorageService,private router: Router, private chatService: Chat2Service, private  af:AngularFireStorage) {

      this.videoRecordingService.recordingFailed().subscribe(() => {
        this.isVideoRecording = false;
        this.ref.detectChanges();
      });
  
      this.videoRecordingService.getRecordedTime().subscribe((time) => {
        this.videoRecordedTime = time;
        this.ref.detectChanges();
      });
  
      this.videoRecordingService.getStream().subscribe((stream) => {
        this.videoStream = stream;
        this.ref.detectChanges();
      });
  
      this.videoRecordingService.getRecordedBlob().subscribe((data) => {
        this.videoBlob = data.blob;
        this.videoName = data.title;
        this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
        this.ref.detectChanges();
      });
  
      this.audioRecordingService.recordingFailed().subscribe(() => {
        this.isAudioRecording = false;
        this.ref.detectChanges();
   });
  
      this.audioRecordingService.getRecordedTime().subscribe((time) => {
        this.audioRecordedTime = time;
        this.ref.detectChanges();
      });
  
      this.audioRecordingService.getRecordedBlob().subscribe((data) => {
        this.audioBlob = data.blob;
        this.audioName = data.title;
        this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
        this.ref.detectChanges();
      });
    }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.listContainer.nativeElement.scrollTop = this.listContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  isLoggedIn = false;
  private roles: string[] = [];
  username?: string;
  UserId: number;
  ngOnInit(): void {
    // Initialize the video element
    if (this.videoElement) {
      this.video = this.videoElement.nativeElement;
      // Your initialization code here
    } else {
      console.error('Video element is not defined.');
    }


        // Sort messages array by time property in descending order
        if (this.messages && this.messages.length > 0) {
          // Sort messages array by time property in descending order
          this.messages.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        }
        console.log(this.messages);
      
   //User currentUser = ....
    this.loadChats();
    this.typingTimer = null;
      this.loadUsersOnlineStatus();


        //user
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.UserId=user.id;
    }
console.log(this.UserId);



this.userService.getAll().subscribe((data) => {
  // console.log(data);

  this.alluser = data;
  console.log(this.alluser);
})



/*const user = this.tokenStorageService.getUser();
    this.chatService.getChatByFirstUserNameAndSecondUserName(user.username, this.username).subscribe(
      (data) => {
        this.messages = data.messages;
        this.chatId = data.chatId;
      
        sessionStorage.setItem("chatId", this.chatId);
        //
      },
      (error) => {
        if (error.status == 404) {
         
          sessionStorage.setItem("chatId", this.chatId);
          console.log("chat:",this.chatId);
          this.chatObj.firstUserName = user.username;
          this.chatObj.secondUserName = this.username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);
            })
        } else {

        }
      });
*/
      setInterval(() => {
        this.chatService.getAllChats().subscribe(chats => {
          if (chats.length > 0) {
            const firstChat = chats[0]; // Par exemple, on prend le premier chat
            this.chatService.getChatById(firstChat.id).subscribe(data => {
              this.chatData = data;
              this.messageList = this.chatData.messageList;
              this.secondUserName = this.chatData.secondUserName;
              this.firstUserName = this.chatData.firstUserName;
            });
          }
        });
      }, 1000);
      


      this.recordAudio = () => {
        return new Promise(resolve => {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm',
                audioBitsPerSecond: 16000,
              });
              const audioChunks = [];
      
              mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
              });
      
              const start = () => {
                mediaRecorder.start();
              };
      
              const stop = () => {
                return new Promise(async resolve => {
                  mediaRecorder.addEventListener('stop', async () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
                    // Define the filename for the recorded audio
                    const filename = 'recorded_audio.webm';
      
                    // Create a reference to the Firebase Storage location where the audio file will be stored
                    const storageRef = this.af.ref('audio/' + filename);
      
                    try {
                      // Upload the audio blob to Firebase Storage
                      const snapshot = await storageRef.put(audioBlob);
      
                      // Get the download URL of the uploaded audio
                      const downloadURL = await snapshot.ref.getDownloadURL();
      
                      console.log('Uploaded the recorded audio successfully:', downloadURL);
      

//

  const user = this.tokenStorageService.getUser();
  const newMessage: Message = {
    id: 0,
    audioPath:  downloadURL,
    senderEmail: '',
    time: '',
    replymessage: '',
    contenu: '',
    sender: user.username
  };
  this.addFile(newMessage);




                      // Resolve with the download URL
                      resolve(downloadURL);
                    } catch (error) {
                      console.error('Error while uploading audio to Firebase Storage:', error);
                      // Reject the promise with the error
                     // reject(error);
                    }
                  });
      
                  mediaRecorder.stop();
                });
              };
      
              resolve({ start, stop });
            });
        });
      };
    }      





  /****************** LOAD CHATS **********************/
  loadChats(): void {
    this.chatService.getAllChats()
        .subscribe(chats => this.chats = chats);
  }

  getSenderOfLastMessage(chat: Chat): string {
    if (chat.messages && chat.messages.length > 0) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      return lastMessage.sender;
    } else {
      return ''; // Retourne une chaîne vide si le chat n'a aucun message
    }
  }

  getSendersInChat(chat: Chat): string[] {
    const senders: string[] = [];
    if (chat.messages && chat.messages.length > 0) {
      // Itérer sur chaque message dans le chat
      for (const message of chat.messages) {
        // Vérifier si l'expéditeur du message n'est pas déjà dans la liste des expéditeurs
        if (!senders.includes(message.sender)) {
          // Ajouter l'expéditeur à la liste
          senders.push(message.sender);
        }
      }
    }
    return senders;
  }
  
  
  /****************** OPEN A CHAT **********************/
  openConversation(chatid: number): void {
    this.selectedChatId = chatid;
    this.isItemClicked = true;
    this.chatService.getChatById(chatid).subscribe(chat => {
      // Use nullish coalescing operator to handle undefined messages
      const sortedMessages = chat.messages?.sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
      this.messages = sortedMessages ?? [];
    });

  }

  /************************** BACK TO CHAT *******************/
  goBack(): void {
    this.isItemClicked = false;
  }

  /************************SHOW MENU ************************/
  toggleMenu(chat: Chat): void {
    this.showMenu = !this.showMenu;
    this.selectedChatId = chat.id;
  }

  closeMenu(): void {
    this.showMenu = false;
  }

  /*********************** DELETE CHAT **********************/
  deleteChat(chatid: number): void {
    this.chatService.deleteChat(chatid)
        .pipe(
            tap(() => console.log('Chat deleted successfully.'))
        ).subscribe();
    this.loadChats();
  }

  /********************* LOAD MESSAGE ************************/
  private loadMessages() {
    if (this.selectedChatId) {
      this.chatService.getChatMessages(this.selectedChatId).subscribe(messages => {
        const sortedMessages = messages.sort((a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
        this.messages = sortedMessages;
        
      });
    }
  }
  /********************* ADD MESSAGE ************************/
 /* addMessage(): void {
      if (this.selectedChatId !== undefined && this.messageContent.trim() !== '') {
        const newMessage: Message = {
          id: 0, // Assuming you have a mechanism to generate message IDs
          contenu: this.messageContent,
          senderEmail: '',
          time: '',
          replymessage: '',
          filePath: '',
          imagePath: ''
        }
          this.chatService.addMessageToChat(this.selectedChatId, newMessage).subscribe(() => {
            // After successfully adding the message, reload the messages
            this.loadMessages();
            // Clear the message input field
            this.messageContent = '';
          });
        }
  }*/
  senderId: string | null;
  selectedsenderId: number | undefined;
  addMessage(): void {
    if (this.selectedChatId !== undefined && this.messageContent.trim() !== '') {
      // Check if senderId is defined and convert it to string if necessary
      let senderId: string | undefined;
      if (this.senderId !== undefined && this.senderId !== null) {
        senderId = this.senderId.toString();
      }
      const user = this.tokenStorageService.getUser();
      const newMessage: Message = {
        
        id: 0, // Assuming you have a mechanism to generate message IDs
        contenu: this.messageContent,
        sender:user.username,
        time: '',
        replymessage: '',
        filePath: '',
        imagePath: '',
        senderEmail: ''
      };
      //selectedsenderId: number | undefined;
      this.chatService.addMessageToChat(this.selectedChatId, this.UserId, newMessage).subscribe(() => {
        // After successfully adding the message, reload the messages
        this.loadMessages();
        // Clear the message input field
        this.messageContent = '';
      });
    }
  }
  

  /******************************** FILTER / SEARCH MESSAGES *************************/

  searchMessages() {
    if (this.messages) {
      // Filter messages based on the search text
      console.log("testing search");
      this.filteredMessages = this.messages.filter(message => {
        if (message && message.contenu) {
          return message.contenu.toLowerCase().includes(this.searchText.toLowerCase());
        }else {
          return false;
        }
      }

      );
    }
  }
  /**********************************   HIGHLIGHT MATCHED MESSAGES **********************************/
  // Method to highlight matched text within messages
  highlightText(messageContent: string): string {
    console.log("testing hightlight");
    if (!this.searchText.trim()) {
      return messageContent;
    }
    const regEx = new RegExp(this.searchText, 'gi');
    return messageContent.replace(regEx, match => `<span class="highlight">${match}</span>`);
  }
  /**********************************   SEARCH USERS      **********************************/
  search(): void {
    if (this.searchUser.trim() !== '') {
      this.chatService.searchUsers(this.searchUser).subscribe(
          (results: User[]) => {
            this.searchResults = results;
          });
    } else {
      this.searchResults = [];
    }}
  /*********************************** ADD NEW CHAT BY USER ***********************************/
  openChatWithUser(user: User): void {
    this.chatService.createChatWithUser(user.idUser)
        .subscribe(newChat => {
          // Reload the chat list after creating a new chat
          this.loadChats();
          // Automatically open the new chat
          this.openConversation(newChat.id);
        });
  }
  /*********************************** CHAT IMAGE SELECTING ***********************************/

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.selectedFile = file;
      this.uploadFile();
    }
  }
  @Input() path: string;
  /********************* SAVE FILE PATH TO DATABASE ************************/
  addFile(message: Message): void {
    const user = this.tokenStorageService.getUser();
    if (this.selectedChatId) {
      this.chatService.addMessageToChat(this.selectedChatId, this.UserId, message).subscribe(() => {
        // reload the messages
        this.loadMessages();
        // Clear the message input field
        this.selectedFile = null;
        this.messageContent = '';
      });
    }
  }
  /*********************************** CHAT IMAGE IMPORTING *******************
  uploadFile(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile.type);
      let filePath = '';
      if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/png') {
        filePath = `images/${this.selectedFile.name}`;
        const fileRef = this.af.storage.ref(filePath);
        const task = fileRef.put(this.selectedFile);
        fileRef.getDownloadURL().then((downloadURL) => {
          const user = this.tokenStorageService.getUser();
          const newMessage: Message = {
            id: 0,
            imagePath: downloadURL,
            senderEmail: '',
            time: '',
            replymessage: '',
            contenu: '',
            filePath: '',
            sender: user.username
          };
          this.addFile(newMessage);
        });
      } else {
        filePath = `files/${this.selectedFile.name}`;
        const fileRef = this.af.storage.ref(filePath);
        const task = fileRef.put(this.selectedFile);
        fileRef.getDownloadURL().then((downloadURL) => {
          const newMessage: Message = {
            id: 0,
            filePath: downloadURL,
            senderEmail: '',
            time: '',
            replymessage: '',
            contenu: '',
            imagePath: '',
            sender: ''
          };
          this.addFile(newMessage);
        });
      }
    }
  }****************/
  uploadFile(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile.type);
      let filePath = '';
  
      // Check if the selected file is an image
      if (this.selectedFile.type.includes('image')) {
        filePath = `images/${this.selectedFile.name}`;
      }
      // Check if the selected file is a video
      else if (this.selectedFile.type.includes('video')) {
        filePath = `videos/${this.selectedFile.name}`;
      }
      // If not an image or video, assume it's a file
      else {
        filePath = `files/${this.selectedFile.name}`;
      }
  
      const fileRef = this.af.storage.ref(filePath);
      const task = fileRef.put(this.selectedFile);
  
      fileRef.getDownloadURL().then((downloadURL) => {
        const user = this.tokenStorageService.getUser();
        const newMessage: Message = {
          id: 0,
          videoPath: this.selectedFile.type.includes('video') ? downloadURL : '',
          imagePath: this.selectedFile.type.includes('image') ? downloadURL : '',
          filePath: this.selectedFile.type.includes('image') ? '' : downloadURL,
          senderEmail: '',
          time: '',
          replymessage: '',
          contenu: '',
          sender: user.username
        };
        this.addFile(newMessage);
      });
    }
  }
  
  
  /*********************************** TYPING INDICATOR ***********************************/
  startTyping() {
    // Clear previous typing timer
    clearTimeout(this.typingTimer);

    // Start new typing timer
    this.typingTimer = setTimeout(() => {
      this.isTyping = false;
      // You can also emit the stop typing indicator via WebSocket here
      // this.webSocketService.sendTypingIndicator(false);
    }, 500); // Adjust the delay as needed (in milliseconds)

    this.isTyping = true;
    // You can also emit the typing indicator via WebSocket here
    // this.webSocketService.sendTypingIndicator(true);
  }

  /************************************** USER ONLINE STATUS *************************/



  loadUsersOnlineStatus(): void {
    if (this.chats) {
      this.chats.forEach(chat => {
        chat.users.forEach(user => {
          this.chatService.getUserOnlineStatus(user.idUser).subscribe(online => {
            user.online = online;
          });
        });
      });
    }
  }

  openCamera() {
    const cameraInput = document.getElementById('cameraInput');
    if (cameraInput) {
      cameraInput.click();
    }
  }
  
  onCameraCapture(cameraInput: any) {
    const file = cameraInput.files[0];
    if (file) {
      // Handle the captured image file here
      // For example, you can upload it to Firebase Storage
     // this.uploadFile(file);
    }
  }
  openVideoCallPage() {
    // Change the URL to the desired location
    window.location.href = 'http://localhost:4200/#/videocall';
  }


  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  // chatId: number = 22;
  public messageList: any = [];
  public chatList: any = [];
  replymessage: String = "checking";
  public chatData: any;
  msg = "Good work";
  chatId: any = sessionStorage.getItem('chatId');
  color = "";
  secondUserName = "";
  check = sessionStorage.getItem('username');
  timesRun = 0;
  timesRun2 = 0;


  firstUserName = sessionStorage.getItem('username');
  senderEmail = sessionStorage.getItem('username');
  senderCheck = sessionStorage.getItem('username');

  goToChat(username: any) {
    const user = this.tokenStorageService.getUser();
    //console.log(user.username);
    this.chatService.getChatByFirstUserNameAndSecondUserName(user.username, username).subscribe(
      (data) => {
        this.chatId = data.chatId;
      
        sessionStorage.setItem("chatId", this.chatId);
        //
      },
      (error) => {
        if (error.status == 404) {
         
          sessionStorage.setItem("chatId", this.chatId);
          console.log("chat:",this.chatId);
          this.chatObj.firstUserName = user.username;
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem("chatId", this.chatData.chatId);
            })
        } else {

        }
      });

  }


  
  showEmojiMenu: boolean = false;

  toggleEmojiMenu(): void {
    this.showEmojiMenu = !this.showEmojiMenu;
  }
  public addEmoji(event: any) {
    // Implémentez votre logique pour ajouter l'emoji ici
    console.log(event); // Vous pouvez accéder à l'emoji sélectionné via event
  }

  goBackk(): void {
    // Use the router to navigate back to the BesoinComponent
    this.router.navigate(['/home']);
  }
  








  recording: boolean = false;
  recordedChunks: Blob[] = [];

 


  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener('dataavailable', event => {
          this.recordedChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
          const filename = 'recorded_audio.webm';

          // Here you can upload the recorded audio to Firebase Storage
          // Add your Firebase Storage upload code here

          this.recordedChunks = [];
        });

        mediaRecorder.start();
        this.recording = true;
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }

 
// Modify toggleRecording() to handle recording and stopping
toggleRecording() {
  if (!this.recording) {
      // Start recording
      this.startRecording();
  } else {
      // Stop recording
      this.stopRecording();
  }
}

// Modify stopRecording() to handle stopping and uploading recorded audio
stopRecording() {
  // Stop recording
  this.recording = false;
  const filename = 'recorded_audio.webm';

  // Create a reference to the Firebase Storage location where you want to store the audio file
  const storageRef = this.af.ref('audio/' + filename);

  // Create a Blob from the recorded audio chunks
  const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });

  // Upload the Blob to Firebase Storage
  const uploadTask = storageRef.put(blob);

  // Get notified when the upload is completed
  uploadTask.snapshotChanges().pipe(
      finalize(() => {
          // Once uploaded, get the download URL of the audio file
          storageRef.getDownloadURL().subscribe(downloadURL => {
              console.log('Uploaded the recorded audio successfully:', downloadURL);

              // Create a new message object with the audio download URL
              const user = this.tokenStorageService.getUser();
              const newMessage: Message = {
                  id: 0,
                  videoPath: '', // Since it's audio, set videoPath and imagePath to empty strings
                  imagePath: '',
                  audioPath: downloadURL,
                  filePath: '', // Assuming you don't need filePath for audio
                  senderEmail: '',
                  time: '',
                  replymessage: '',
                  contenu: '',
                  sender: user.username
              };

              // Add the new message to the chat
              this.addFile(newMessage);
          });
      })
  ).subscribe({
      error: error => {
          console.error('Error uploading recorded audio:', error);
      }
  });

  // Reset the recordedChunks array
  this.recordedChunks = [];
}








playSound(){

  let audio=new Audio();
  audio.src="../assets/uploads/mixkit-positive-notification-951.wav";
  audio.load();
  audio.play();

}
// Material Style Basic Audio Player Title and Audio URL
msbapTitle = 'Audio Title';
msbapAudioUrl = 'Online MP3 File URL';   
msbapDisplayTitle = true; 

blobFile: any = null; // Initialize with null or appropriate initial value

recordAudio;
sendObj = {
  audio: this.blobFile
};
audioContext =  new (AudioContext)({sampleRate: 16000});
recorder = new Recorder(this.audioContext, {});
async startPlay() {
  this.recording = true;
  this.recorder = await this.recordAudio();
  this.recorder.start();
}

async stopPlay() {
  this.recording = false;
  const audio = await this.recorder.stop();
  audio.play();
}



showAudio: boolean = false;
selectedAudio: string = '';

showAudioPlayer(audioPath: string) {
    this.showAudio = true;
    this.selectedAudio = audioPath;
}


















@ViewChild('videoElement') videoElement: any;
video: any;
audit: any;
isPlaying = false;
displayControls = true;
isAudioRecording = false;
isVideoRecording = false;
audioRecordedTime;
videoRecordedTime;
audioBlobUrl;
videoBlobUrl;
audioBlob;
videoBlob;
audioName;
videoName;
audioStream;
videoStream: MediaStream;
audioConf = { audio: true}
videoConf = { video: { facingMode:"user", width: 320 }, audio: true}
recorderr;

ngAfterViewInit() {
  // Initialize the video element after it's been rendered
  this.video = this.videoElement.nativeElement;
}
/*

startVideoRecording() {
  if (!this.isVideoRecording) {
    // Ensure that this.video is defined before accessing its properties
    if (this.video) {
      this.video.controls = true; // Set controls property to true
      this.isVideoRecording = true;
      this.videoRecordingService.startRecording(this.videoConf)
        .then(stream => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    } else {
      console.error('Video element is not defined.');
    }
  }

}
*/

abortVideoRecording() {
  if (this.isVideoRecording) {
    this.isVideoRecording = false;
    this.videoRecordingService.abortRecording();
    this.video.controls = false;
  }
}

/*stopVideoRecording() {
  if (this.isVideoRecording) {
    this.videoRecordingService.stopRecording();
    this.video.srcObject = this.videoBlobUrl;
    this.isVideoRecording = false;
    this.video.controls = true;
  }
}*/

clearVideoRecordedData() {
  this.videoBlobUrl = null;
  this.video.srcObject = null;
  this.video.controls = false;
  this.ref.detectChanges();
}

downloadVideoRecordedData() {
  this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
}
/* 
startAudioRecording() {
 if (!this.isAudioRecording) {
    this.isAudioRecording = true;
    this.audioRecordingService.startRecording();
  }
}*/

startAudioRecording() {
  if (!this.isAudioRecording) {
    // Ensure that this.audioRecordingService is defined before accessing its methods
    if (this.audioRecordingService) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      console.error('Audio recording service is not defined.');
    }
  } else {
    console.error('Audio recording is already in progress.');
  }
}






abortAudioRecording() {
  if (this.isAudioRecording) {
    this.isAudioRecording = false;
    this.audioRecordingService.abortRecording();
  }
}

stopAudioRecording() {
  if (this.isAudioRecording) {
    this.audioRecordingService.stopRecording();
    this.isAudioRecording = false;
  }
}

clearAudioRecordedData() {
  this.audioBlobUrl = null;
}

downloadAudioRecordedData() {
  this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
}

ngOnDestroy(): void {
  this.abortAudioRecording();
}

_downloadFile(data: any, type: string, filename: string): any {
  const blob = new Blob([data], { type: type });
  const url = window.URL.createObjectURL(blob);
  //this.video.srcObject = stream;
  //const url = data;
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = url;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}




// Define a variable to store the start time of the recording
private videoRecordingStartTime: number;

async startVideoRecording() {




  if (!this.isVideoRecording) {
    // Ensure that this.video is defined before accessing its properties
    if (this.video) {
      this.video.controls = true; // Set controls property to true
      this.isVideoRecording = true;

      // Capture the start time of the recording
      this.videoRecordingStartTime = Date.now();


      this.videoChunks = [];

 
      
      // Start the video recording service
      this.videoRecordingService.startRecording(this.videoConf)
        .then(stream => {
     // Start capturing video from the video element
     this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
     this.mediaRecorder.addEventListener('dataavailable', event => {
       if (event.data.size > 0) {
         this.videoChunks.push(event.data);
       }
     });
     this.mediaRecorder.start();
          this.video.srcObject = stream;

          this.video.play();
        })
        .catch(err => {
          console.error('Error starting video recording:', err);
        });
    } else {
      console.error('Video element is not defined.');
    }
  }
}

async stopVideoRecording() {
  if (this.isVideoRecording) {
    // Stop the video recording and get the recorded blob
    const recordedBlob = await this.videoRecordingService.stopRecording();
    
 

    // Proceed with uploading the recorded video to Firebase Storage
    const filename = 'recorded_video.mp4'; // Choose a filename with .mp4 extension
    const storageRef = this.af.ref('video/' + filename); // Assuming you want to store videos in a 'video' directory
    const uploadTask = storageRef.put(recordedBlob, { contentType: 'video/mp4' }); // Set content type to video/mp4

    try {
      // Upload the video blob to Firebase Storage
      const snapshot = await uploadTask;

      // Get the download URL of the uploaded video
      const downloadURL = await snapshot.ref.getDownloadURL();

      console.log('Uploaded the recorded video successfully:', downloadURL);

      const user = this.tokenStorageService.getUser();
      // Create a new message with the video URL and duration information
      const newMessage: Message = {
        id: 0,
        videoPath: downloadURL,
        senderEmail: '',
        time: '', // You might want to set the timestamp for when the message was sent
        replymessage: '',
        contenu: '', // Optionally, you can include a message content
        sender: user.username,
        //duration: durationString // Add the duration information to the message
      };

      // Add the message with the video URL to the chat
      this.addFile(newMessage);
      console.log('Adding file:', newMessage);
    } catch (error) {
      console.error('Error while uploading video to Firebase Storage:', error);
    }

    // Stop video recording and reset controls
    this.video.srcObject = null;
    this.isVideoRecording = false;
    this.video.controls = true;
  }
}



















@ViewChild('videoElement') videoElementt: ElementRef;


//videoRecordingStartTime: number | null = null; // Define videoRecordingStartTime property
mediaRecorder: MediaRecorder | null = null; // Define mediaRecorder property
videoChunks: Blob[] = []; // Define videoChunks property

async startVideoRecordingg() {
  if (!this.isVideoRecording) {
    // Ensure that this.video is defined before accessing its properties
    if (this.video) {
      try {
        // Request permission and obtain MediaStream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true,audio : true});

        // Assign MediaStream to the video element
        this.video.srcObject = stream;

        // Set controls property to true
        this.video.controls = true;

        // Set flag to indicate video recording has started
        this.isVideoRecording = true;

        // Capture the start time of the recording
        this.videoRecordingStartTime = Date.now();

        // Initialize videoChunks array to store video chunks
        this.videoChunks = [];

        // Start capturing video from the video element
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        this.mediaRecorder.addEventListener('dataavailable', event => {
          if (event.data.size > 0) {
            this.videoChunks.push(event.data);
          }
        });
        this.mediaRecorder.start();
      } catch (error) {
        console.error('Error accessing camera or starting recording:', error);
      }
    } else {
      console.error('Video element is not defined.');
    }
  }
}

async stopVideoRecordingg() {
  const recordedBlob = await this.videoRecordingService.stopRecording();
  if (this.isVideoRecording) {
    // Stop the media recorder and capture the recorded video Blob
    return new Promise((resolve, reject) => {
      this.mediaRecorder.addEventListener('stop', () => {
        const videoBlob = new Blob(this.videoChunks, { type: 'video/webm' });
        resolve(videoBlob);
      });

      this.mediaRecorder.stop();
    })
    .then(async (recordedBlob: Blob) => {
      // Check if the recordedBlob is not empty
      if (recordedBlob && recordedBlob.size > 0) {
        // Proceed with uploading the recorded video to Firebase Storage
        const filename = 'recorded_video.webm'; // Choose a filename with the appropriate extension
        const storageRef = this.af.ref('video/' + filename); // Assuming you want to store videos in a 'video' directory
        const uploadTask = storageRef.put(recordedBlob, { contentType: 'video/webm' }); // Set content type to video/webm

        try {
          // Upload the video blob to Firebase Storage
          const snapshot = await uploadTask;

          // Get the download URL of the uploaded video
          const downloadURL = await snapshot.ref.getDownloadURL();
          console.log('Uploaded the recorded video successfully:', downloadURL);

          const user = this.tokenStorageService.getUser();
          // Create a new message with the video URL and duration information
          const newMessage: Message = {
            id: 0,
            videoPath: downloadURL,
            senderEmail: '',
            time: '', // You might want to set the timestamp for when the message was sent
            replymessage: '',
            contenu: '', // Optionally, you can include a message content
            sender: user.username,
            //duration: durationString // Add the duration information to the message
          };
    
          // Add the message with the video URL to the chat
          this.addFile(newMessage);

          console.log('Uploaded the recorded video successfully:', downloadURL);
          console.log(newMessage);
          // Additional processing as needed
        } catch (error) {
          console.error('Error while uploading video to Firebase Storage:', error);
        }
      } else {
        console.error('Recorded video blob is empty.');
      }

      // Stop video recording and reset controls
      this.isVideoRecording = false;
      this.video.controls = true;
      this.videoChunks = [];
    })
    .catch(error => {
      console.error('Error stopping video recording:', error);
    });
  }
}



async stopVideoRecordinggg() {
  const recordedBlob = await this.videoRecordingService.stopRecording();
  if (this.isVideoRecording) {
    // Stop the media recorder and capture the recorded video Blob
    return new Promise((resolve, reject) => {
      this.mediaRecorder.addEventListener('stop', () => {
        const videoBlob = new Blob(this.videoChunks, { type: 'video/webm' });
        resolve(videoBlob);
      });

      this.mediaRecorder.stop();
    })
    .then(async (recordedBlob: Blob) => {
      
      // Check if the recordedBlob is not empty
      if (recordedBlob && recordedBlob.size > 0) {
        // Proceed with uploading the recorded video to Firebase Storage
        const filename = 'recorded_video.webm'; // Choose a filename with the appropriate extension
        const storageRef = this.af.ref('video/' + filename); // Assuming you want to store videos in a 'video' directory
        const uploadTask = storageRef.put(recordedBlob, { contentType: 'video/webm' }); // Set content type to video/webm

        try {
          // Upload the video blob to Firebase Storage
          const snapshot = await uploadTask;

          // Get the download URL of the uploaded video
          const downloadURL = await snapshot.ref.getDownloadURL();
          console.log('Uploaded the recorded video successfully:', downloadURL);

          const user = this.tokenStorageService.getUser();
          // Create a new message with the video URL and duration information
          const newMessage: Message = {
            id: 0,
            videoPath: downloadURL,
            senderEmail: '',
            time: '', // You might want to set the timestamp for when the message was sent
            replymessage: '',
            contenu: '', // Optionally, you can include a message content
            sender: user.username,
            //duration: durationString // Add the duration information to the message
          };
    
          // Add the message with the video URL to the chat
          this.addFile(newMessage);

          console.log('Uploaded the recorded video successfully:', downloadURL);
          console.log(newMessage);
          // Additional processing as needed
        } catch (error) {
          console.error('Error while uploading video to Firebase Storage:', error);
        }
      } else {
        console.error('Recorded video blob is empty.');
      }

      // Stop video recording and reset controls
      this.isVideoRecording = false;
      this.video.controls = true;
      this.videoChunks = [];
    })
    .catch(error => {
      console.error('Error stopping video recording:', error);
    });
  }
}


}











