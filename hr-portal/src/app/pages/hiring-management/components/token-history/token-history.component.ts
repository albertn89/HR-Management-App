import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationToken } from 'src/app/interfaces/registration-token';
import { loadTokenHistory } from 'src/app/store/token/token.actions';
import { selectAllTokens } from 'src/app/store/token/token.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-token-history',
  templateUrl: './token-history.component.html',
  styleUrls: ['./token-history.component.scss'],
})
export class TokenHistoryComponent implements OnInit {
  tokens$!: Observable<RegistrationToken[]>;

  constructor(private store: Store, private dialogRef: MatDialogRef<TokenHistoryComponent>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTokenHistory());
    this.tokens$ = this.store.select(selectAllTokens);
  }

  getFullInviteLink(token: string): string {
    return `${environment.reactBaseUrl}/register/${token}`;
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }
}
