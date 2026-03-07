import { Component, OnInit } from '@angular/core'
// import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  currentUser = "Manpreet"

  conversations:any[] = []

  activeConversation:any

  newMessage = ''

  ngOnInit(){

    // ===== Dummy Conversations =====

    this.conversations = [

      {
        id:1,
        name:"Rahul Sharma",
        lastMessage:"See you at the alumni meetup!",
        messages:[
          {sender:"Rahul", text:"Hey!"},
          {sender:"Manpreet", text:"Hi Rahul"},
          {sender:"Rahul", text:"See you at the alumni meetup!"}
        ]
      },

      {
        id:2,
        name:"Ananya Gupta",
        lastMessage:"Thanks for sharing the job!",
        messages:[
          {sender:"Ananya", text:"Thanks for sharing the job!"}
        ]
      }

    ]

  }

  selectConversation(convo:any){

    this.activeConversation = convo

  }

  sendMessage(){

    if(!this.newMessage) return

    this.activeConversation.messages.push({
      sender:this.currentUser,
      text:this.newMessage
    })

    this.newMessage = ''



    // ===== Supabase Messaging (Enable Later) =====

    /*
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    await supabase
      .from('messages')
      .insert({
        sender_id: currentUserId,
        receiver_id: activeConversation.id,
        message: this.newMessage
      })
    */

  }

}
