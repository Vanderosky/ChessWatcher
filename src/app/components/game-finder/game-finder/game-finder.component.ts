import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameIdService } from 'src/app/services/game-id/game-id.service';

@Component({
  selector: 'app-game-finder',
  templateUrl: './game-finder.component.html',
  styleUrls: ['./game-finder.component.css'],
})
export class GameFinderComponent implements OnInit {
  @HostBinding('className') componentClass: string;

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  private id = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameIdService: GameIdService,
  ) {
    this.componentClass = 'center';
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      game: ['', Validators.required],
    });
  }

  async ngOnInit() {}

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const game = this.form.get('game')?.value;
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
      return;
    }
    const gameId = this.form.get('game')?.value;
    this.gameIdService.setGameId(gameId);
    this.router.navigateByUrl("/watch/" + gameId);
  }

  getRouteParameter(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = Number(params.get('id')) || 0;
      }
    });
  }

}
