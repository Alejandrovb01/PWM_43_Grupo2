import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements AfterViewInit {
  @ViewChild('reviewForm') reviewForm!: ElementRef<HTMLFormElement>;
  hiddenInput!: HTMLInputElement;

  ngAfterViewInit(): void {
    const starContainer = document.getElementById('star-rating');
    const stars = document.querySelectorAll<HTMLSpanElement>('.star');

    // Crear el input oculto
    this.hiddenInput = document.createElement('input');
    this.hiddenInput.type = 'hidden';
    this.hiddenInput.name = 'rating';
    this.hiddenInput.value = '0';

    if (starContainer) {
      starContainer.appendChild(this.hiddenInput);
    }

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = star.getAttribute('data-value') || '0';
        this.hiddenInput.value = value;

        stars.forEach(s => {
          if ((s.getAttribute('data-value') || '0') <= value) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });

      star.addEventListener('mouseover', () => {
        const value = star.getAttribute('data-value') || '0';
        stars.forEach(s => {
          s.style.color =
            (s.getAttribute('data-value') || '0') <= value ? 'gold' : 'grey';
        });
      });

      star.addEventListener('mouseout', () => {
        stars.forEach(s => {
          if (!s.classList.contains('active')) {
            s.style.color = 'grey';
          }
        });
      });
    });

    // Validar antes de enviar
    if (this.reviewForm) {
      this.reviewForm.nativeElement.addEventListener('submit', (event) => {
        if (this.hiddenInput.value === '0') {
          alert('Por favor, selecciona una valoración.');
          event.preventDefault();
        }
      });
    }
  }
}
