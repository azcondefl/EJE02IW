import { Component, ViewChild } from '@angular/core';
import { AlertController, IonList, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public tasks: string[] = new Array();

  @ViewChild('lisliding', { static: false }) mySliding!: IonList;

  constructor(
    private tasksService: TaskService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    
  }

  async presentAlert(pos: number) {
    const alert = await this.alertController.create({
      header: 'Seguro que desea descompletar la tarea ' + this.tasks[pos],
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            this.presentToast('Se canceló la acción', 'red');
            this.mySliding.closeSlidingItems();
          },
        },
        {
          text: 'SI',
          role: 'confirm',
          handler: () => {
            this.uncompleteTask(pos);
            this.mySliding.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: color,
    });
    await toast.present();
  }

  public uncompleteTask(pos: number) {
    this.tasks = this.tasksService.uncompleteTask(pos);
    this.presentToast('Tarea removida', 'green');
  }

  ionViewDidEnter() {
    this.tasks = this.tasksService.getCompletedTasks();
  }
}
