import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-finder',
  templateUrl: './game-finder.component.html',
  styleUrls: ['./game-finder.component.css'],
})
export class GameFinderComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  private id = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    
    this.router.navigateByUrl("/watch/" + this.form.get('game')?.value);
  }

  getRouteParameter(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = Number(params.get('id')) || 0;
      }
    });
  }

}
