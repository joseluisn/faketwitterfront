import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { tweet } from '../model/tweet.model';
import { user } from '../model/user.model';
import { TweetsService } from '../services/tweets.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo = new user("chikerita", "chikeritapwd");
  userFollowers;
  listaTweets: [];
  tweets;
  newTweetText: string;
  constructor(private tweetsService: TweetsService) {
    this.getTweets();
  }
  getTweets() {
    this.tweetsService.getUserTweets(this.userInfo).subscribe(resp => {
      console.log(resp.body);
      const keys = resp.headers.keys();
      let headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
      this.tweets = resp.body;
      this.listaTweets = this.tweets.data;
      console.log(this.listaTweets);
    });
  }

  publicar() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let newTweet = new tweet(this.userInfo.user, this.newTweetText, dd + '/' + mm + '/' + yyyy);
    this.tweetsService.createTweet(newTweet);
  }

  ngOnInit(): void {
    
  }

}
