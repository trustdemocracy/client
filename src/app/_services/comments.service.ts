import { Injectable } from "@angular/core";
import { HttpService } from "app/_services/http.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Comment } from "app/_models/comment";
import { environment } from 'app/../environments/environment';

@Injectable()
export class CommentsService {

  constructor(private http: HttpService) {
  }

  create(comment: Comment): Observable<Comment> {
    const url = environment.proposalsApi.createComment
      .replace(':proposalId', comment.proposalId);

    delete comment['comments'];

    return this.http.post(url, JSON.stringify(comment))
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return Comment.buildFromJson(response.json());
        }
        return null;
      });
  }

  find(proposalId: string): Observable<Comment[]> {
    const url = environment.proposalsApi.getComments
      .replace(':proposalId', proposalId);

    return this.http.get(url)
      .map((response: Response) => {
        if (response.ok && response.json()) {
          return this.createCommentsArray(response.json());
        }
        return null;
      });
  }

  private createCommentsArray(comments: any[]): Comment[] {
    const result: Comment[] = [];
    const commentsMap: { [key:string]:Comment; } = {};

    for (let i = 0; i < comments.length; i++) {
      commentsMap[comments[i].id] = Comment.buildFromJson(comments[i]);
    }

    for (let commentId in commentsMap) {
      let comment = commentsMap[commentId];
      if (commentsMap.hasOwnProperty(comment.rootCommentId)) {
        commentsMap[comment.rootCommentId].comments.push(comment);
        delete commentsMap[commentId];
      }
    }

    for (let commentId in commentsMap) {
      result.push(commentsMap[commentId]);
    }
    return result;
  }

}
