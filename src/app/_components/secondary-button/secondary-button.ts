import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

CommonModule

@Component({
  selector: 'app-secondary-button',
  imports: [CommonModule],
  templateUrl: './secondary-button.html',
  styleUrl: './secondary-button.css'
})
export class SecondaryButton {
  @Input() textoBotao: string = "";
  @Input() phClass: string = "";
  @Input() disabled: boolean = false;
}

