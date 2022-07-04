import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorService } from '../services/behavior.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

 interface Role {
   value: string;
  viewValue: string;
}

// interface Behavior {
//   value: string;
//   viewValue: string;
//   viewDescription: string;
// }
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  behaviorForm!: FormGroup;
  actionBtn: string = "Salva";

  roles: Role[] = [
    { value: 'analyst1', viewValue: 'Analyst 1'},
    { value: 'analyst2', viewValue: 'Analyst 2'},
    { value: 'consultant1', viewValue: 'Consultant 1'},
    { value: 'consultant2', viewValue: 'Consultant 2'},
    { value: 'manager', viewValue: 'Manager'},
    { value: 'seniorManager', viewValue: 'Senior Manager'},
  ];

  // behaviors: Behavior[] = [
  //   { value: 'capacitàAnalisi',
  //     viewValue: 'Capacità di Analisi',
  //     viewDescription: 'Capacità nell’affrontare un problema non nella sua globalità, bensì scomponendolo in segmenti essenziali che risultino tuttavia legati da connessioni logiche.'
  //     },
  //   { value: 'capacitàComunicative',
  //     viewValue: 'Capacità di Comunicare',
  //     viewDescription: 'Capacità di trasmettere un messaggio (sia verbale che non), in modo chiaro e comprensibile sia nella formulazione che nel contenuto.  Importante per una buona comunicazione è il sapersi porre nei panni dell’interlocutore in modo da scegliere i mezzi espressivi più coerenti a quest’ultimo.'
  //   },
  //   { value: 'capacitàGruppo',
  //     viewValue: 'Capacità di Lavorare in Gruppo',
  //     viewDescription: 'È la capacità dell’individuo di stabilire dei contatti con altri soggetti onde pervenire a dei risultati che vanno oltre la semplice somma dei contributi dei singoli membri, in quanto scaturiscono da un reciproco influenzamento di opinioni che dovrebbero avvenire in un clima di conflitto/consenso tollerabile e di rispetto/fiducia reciproca.'
  //   },
  //   { value: 'capacitàOrganizzativa',
  //     viewValue: 'Capacità Organizzativa',
  //     viewDescription: 'Capacità di definizione di una modalità di approccio ai problemi, che consenta: - L’individuazione e la previsione delle connessioni logiche tra i vari elementi di una situazione di lavoro complessa. - La gestione di tale situazione secondo logiche temporali e di priorità adeguate, con il corretto utilizzo delle risorse.'
  //   },
  //   { value: 'capacitàApprensiva',
  //     viewValue: "Capacità di Apprendere dall'esperienza",
  //     viewDescription: 'Capacità di utilizzare l’esperienza (propria e altrui) ed il controllo dei risultati per verificare l’adeguatezza delle proprie conoscenze, capacità e atteggiamenti, in rapporto ai compiti ed agli obiettivi, al fine di sviluppare ulteriormente il proprio livello di competenza. In particolare: capacità di cogliere nei problemi tecnici (e di relazione con l’altro) gli stimoli per ridefinire le scelte operative, normative e comportamentali.'
  //   },
  //   { value: 'flessibilitàMentale',
  //     viewValue: 'Flessibilità Mentale',
  //     viewDescription: 'Capacità di recepire nuove e varie idee, di valutare e saperle adattare con autonomia e spirito critico, al rispetto delle esigenze altrui, coscienti della relatività delle proprie. È la maturità con la quale si fronteggiano la diversità e la complessità delle situazioni.'
  //   },
  //   { value: 'iniziativaRealizzatrice',
  //     viewValue: 'Iniziativa Realizzatrice',
  //     viewDescription: 'Capacità di auto-attivarsi di fronte ad un problema imprevisto o ad un’opportunità (occasione di utilizzare al meglio le risorse disponibili), al fine di garantire il conseguimento di un risultato particolarmente significativo.'
  //   },
  //   { value: 'affrontareProblemi',
  //     viewValue: 'Capacità di Affrontare Problemi',
  //     viewDescription: 'Capacità di porsi in modo costruttivo rispetto ad un evento problematico, attivando uno schema logico che preveda, nel rispetto del proprio stile di comportamento, i seguenti passi: definizione del problema, raccolta delle informazioni relative, elaborazione delle ipotesi di causa, individuazione della causa più probabile, sviluppo operativo dell’analisi. Tutto ciò, non perdendo di vista la risorsa tempo.'
  //   },
  //   { value: 'autonomiaDecisionale',
  //     viewValue: 'Autonomia e Capacità Decisionale',
  //     viewDescription: 'Capacità di esercitare la propria discrezionalità, all’interno dei confini di ruolo (o con una realistica forzatura degli stessi), al fine di raggiungere un obiettivo prefissato e verificabile, tollerando l’ansia derivante dal fatto di non poter verificare immediatamente la bontà delle proprie soluzioni e decisioni. Per esercizio della discrezionalità si intende la scelta, in situazioni che comportino un significativo impegno delle risorse, di una delle possibilità offerte sul campo, dopo averne valutato la gamma complessiva.'
  //   },
  //   { value: 'leadership',
  //     viewValue: 'Leadership',
  //     viewDescription: 'Capacità di svolgere l’attività di guida, di coordinamento, di controllo delle persone per il raggiungimento di determinati obiettivi. Tale attività si può esplicitare secondo modalità diverse, dipendenti dalle caratteristiche di personalità del “Leader”, e dalla sua capacità di gestire in modo flessibile, ma determinato, situazioni diverse anche se contingenti e complesse.'
  //   },
  //   { value: 'sensibilitàGestionale',
  //     viewValue: 'Sensibilità Gestionale',
  //     viewDescription: "La capacità di condurre ed amministrare un insieme di attività e/o di beni materiali e/o di risorse umane, secondo quelle che sono le finalità dell'azienda."
  //   },
  //   { value: 'orientamentoRisultati',
  //     viewValue: 'Orientamento ai Risultati',
  //     viewDescription: 'Capacità di porsi in modo realistico delle “mete” ed attivarsi con consapevolezza nel perseguirle'
  //   },
  //   { value: 'capacitàVendereIdee',
  //     viewValue: 'Capacità di Vendere le Proprie Idee',
  //     viewDescription: 'Capacità di individuare ed utilizzare argomentazioni convincenti e persuasive ma anche di cogliere quelle fornite dall’interlocutore al fine di perseguire obiettivi personali.'
  //   },
  //   { value: 'orientamentoInnovazione',
  //     viewValue: "Orientamento all'Innovazione",
  //     viewDescription: 'Capacità di colui che privilegia gli aspetti critici e speculativi dei problemi con continua attenzione al nuovo e all’opinabile, non lasciandosi influenzare dal “passato”, dalle “regole” e dalle “norme”, dal precodificato, dal meccanicamente ripetibile, dall’oggettivo e dalla conservazione del certo, riesce a fare emergere da parametri noti risultati originali.'
  //   }


  // ]
  constructor(private formBuilder: FormBuilder,
              private behaviorService: BehaviorService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.behaviorForm = this.formBuilder.group({
      role: ['', Validators.required],
      expectedValue: ['', Validators.required],
      behavior: ['', Validators.required],
      description: ['', Validators.required]
    });
    if(this.editData) {
      this.actionBtn = "Aggiorna";
      this.behaviorForm.controls['role'].setValue(this.editData.role);
      this.behaviorForm.controls['expectedValue'].setValue(this.editData.expectedValue);
      this.behaviorForm.controls['behavior'].setValue(this.editData.behavior);
      this.behaviorForm.controls['description'].setValue(this.editData.description);
    }
  }



  addBehavior() {
    if(!this.editData){
      if(this.behaviorForm.valid){
        this.behaviorService.postBehavior(this.behaviorForm.value)
        .subscribe({
          next: (res) => {
            alert("Comportamento aggiunto con successo");
            this.behaviorForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Impossibile aggiungere")
          }
        })
      }
    } else {
      this.updateBehavior()
    }
  }
  updateBehavior() {
    this.behaviorService.putBehavior(this.behaviorForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Comportamento aggiornato con successo");
        this.behaviorForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Errore durante l'aggiornamento");
      }
    })
  }
}
