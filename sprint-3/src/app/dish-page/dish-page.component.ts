import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataService } from '../services/firebase-data.service';
import { CommonModule, Location } from '@angular/common';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';

interface Alergeno {
  name: string;
}

interface Dish {
  id: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  stock: boolean;
  alergenos: Alergeno[];
}

interface NavigationState {
  fromMenuQr?: boolean;
}

@Component({
  selector: 'app-dish-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dish-page.component.html',
  styleUrl: './dish-page.component.css'
})
export class DishPageComponent implements OnInit {
  dishId: string | null = null;
  dish: Dish = {
    id: '',
    category: '',
    description: '',
    image: '',
    name: '',
    price: 0,
    stock: false,
    alergenos: []
  };
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();
  showAddButton = false;

  constructor(
    private route: ActivatedRoute,
    private firebaseDataService: FirebaseDataService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const navigationState = this.location.getState() as NavigationState;
    if (navigationState?.fromMenuQr) {
      this.showAddButton = true;
    }

    this.route.paramMap.subscribe(params => {
      this.dishId = params.get('id');
      if (this.dishId) {
        this.getDishDetails(this.dishId);
      }
    });
  }

  getDishDetails(id: string): void {
    this.loading.next(true);
    this.firebaseDataService.getData('menu').pipe(
      switchMap(menuItems => {
        const foundItem = menuItems.find(item => item.id === id);
        let foundDish: Dish | undefined;
        if (foundItem) {
          foundDish = foundItem as Dish;
          this.dish = { ...foundDish, alergenos: [] };
          const alergenosCollection = collection(this.firebaseDataService['db'], 'menu', id, 'alérgenos');
          return new Observable(subscriber => {
            getDocs(alergenosCollection)
              .then(snapshot => {
                snapshot.forEach(doc => {
                  const alergenoData = doc.data() as Alergeno;
                  this.dish.alergenos.push(alergenoData);
                });
                subscriber.next(this.dish);
                subscriber.complete();
              })
              .catch(error => {
                console.error('Error al obtener los alérgenos:', error);
                subscriber.error(error);
              });
          });
        } else {
          console.log(`Plato con ID ${id} no encontrado.`);
          return of(null);
        }
      })
    ).subscribe(
      (dishWithAlergenos) => {
        if (dishWithAlergenos) {
          this.dish = <Dish>dishWithAlergenos;
        }
        this.loading.next(false);
      },
      (error) => {
        console.error('Error al obtener los detalles del plato:', error);
        this.loading.next(false);
      }
    );
  }

  addToCart(dish: Dish): void {
    console.log('Añadir al carrito:', dish);
  }

  goBack(): void {
    this.router.navigate(['/menu-qr']);
  }
}
