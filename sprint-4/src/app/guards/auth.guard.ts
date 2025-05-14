import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firstValueFrom, from } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return from(
    new Promise<boolean>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          router.navigate(['/login']);
          resolve(false);
        }
      });
    })
  );
};
