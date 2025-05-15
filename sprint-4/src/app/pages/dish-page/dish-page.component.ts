import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataService } from '../../services/firebase-data.service';
import { CommonModule, Location } from '@angular/common';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';
import { IonicModule, ToastController } from '@ionic/angular';


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
  imports: [CommonModule, IonicModule],
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
    private location: Location,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const navigationState = this.location.getState() as NavigationState;
    this.showAddButton = !!navigationState?.fromMenuQr;

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
        if (foundItem) {
          this.dish = { ...foundItem, alergenos: [] } as Dish;
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
          console.warn(`Plato con ID ${id} no encontrado.`);
          return of(null);
        }
      })
    ).subscribe({
      next: (dishWithAlergenos) => {
        if (dishWithAlergenos) this.dish = dishWithAlergenos as Dish;
        this.loading.next(false);
      },
      error: (error) => {
        console.error('Error al obtener los detalles del plato:', error);
        this.loading.next(false);
      }
    });
  }

  async addToCart(dish: Dish): Promise<void> {
    console.log('Añadir al carrito:', dish);
    const toast = await this.toastController.create({
      message: `${dish.name} añadido al carrito.`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }


  addToFavorites(dish: Dish) {
    // Pendiente
  }

  goBack(): void {
    this.router.navigate(['/menu-qr']);
  }



}
