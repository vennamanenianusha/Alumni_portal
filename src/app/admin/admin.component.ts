import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  view: string = 'dashboard';
  showStudentMenu = false;
  selectedBatch = '';
  students: any[] = [];

  // EDIT STATE
  editId: number | null = null;
  editStudent: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  showDashboard() {
    this.view = 'dashboard';
  }

  toggleStudentMenu() {
    this.showStudentMenu = !this.showStudentMenu;
  }

  closeStudentMenu() {
    this.showStudentMenu = false;
  }

  loadBatch(batch: string) {
    this.selectedBatch = batch;
    this.showStudentMenu = false;
  
    const batchNumber = parseInt(batch.replace('Batch ', ''));
  
    console.log("Calling API with batch:", batchNumber);
  
    this.http.get<any[]>(
      `http://localhost:3000/api/admin/students/${batchNumber}`
    ).subscribe({
      next: (data) => {
        console.log("Students received:", data);
        this.students = data;
        this.view = 'students';
      },
      error: (err) => {
        console.error("API ERROR:", err);
        alert('Failed to load students');
      }
    });
  }
  

  /* ================= EDIT ================= */

  startEdit(student: any) {
    this.editId = student.id;
    this.editStudent = { ...student };
  }

  updateStudent() {
    this.http.put(
      `http://localhost:3000/api/admin/students/${this.editId}`,
      this.editStudent
    ).subscribe({
      next: () => {
        const index = this.students.findIndex(s => s.id === this.editId);
        if (index !== -1) {
          this.students[index] = { ...this.editStudent };
        }
        this.editId = null;
      },
      error: () => alert('Update failed')
    });
  }

  /* ================= DELETE ================= */

  deleteStudent(id: number) {
    if (!confirm('Delete this student?')) return;

    this.http.delete(
      `http://localhost:3000/api/admin/students/${id}`
    ).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== id);
      },
      error: () => alert('Delete failed')
    });
  }

  postEvents() {
    this.view = 'events';
    this.loadEvents();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
  placements: any[] = [];
placementEditId: any = null;

newPlacement = {
  role: '',
  company: '',
  date_posted: '',
  skills_required: ''
};

  placementEdit = { ...this.newPlacement };

  // Toast
  showToast = false;
  toastMessage = '';

  private triggerToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }

postPlacements() {
  this.view = 'placements';
  this.loadPlacements();
}

loadPlacements() {
  this.http.get<any[]>('http://localhost:3000/api/admin/placements')
    .subscribe({
      next: (data) => this.placements = data,
      error: () => alert('Failed to load placements')
    });
}

addPlacement() {
    this.http.post(
      'http://localhost:3000/api/admin/placements',
      this.newPlacement
    ).subscribe({
    next: (p) => {
      this.placements.push(p);
      this.newPlacement = { role: '', company: '', date_posted: '', skills_required: ''};
      this.triggerToast('Placement added');
    },
    error: () => alert('Insert failed')
  });
}

startPlacementEdit(p: any) {
  this.placementEditId = p.id;
  this.placementEdit = { ...p };
}

updatePlacement() {
    this.http.put(
      `http://localhost:3000/api/admin/placements/${this.placementEditId}`,
      this.placementEdit
    ).subscribe({
    next: () => {
      const index = this.placements.findIndex(x => x.id === this.placementEditId);
      this.placements[index] = { ...this.placementEdit };
      this.placementEditId = null;
      this.triggerToast('Placement updated');
    },
    error: () => alert('Update failed')
  });
}

deletePlacement(id: any) {
  this.http.delete(
    `http://localhost:3000/api/admin/placements/${id}`
  ).subscribe({
    next: () => {
      this.placements = this.placements.filter(p => p.id !== id);
      this.triggerToast('Placement deleted');
    },
    error: () => alert('Delete failed')
  });
}

// ===== Events =====
events: any[] = [];
eventEditId: any = null;

newEvent = {
  title: '',
  location: '',
  description: '',
  event_date: '',
  organized_by: ''
};

eventEdit = { ...this.newEvent };

loadEvents() {
  this.http.get<any[]>('http://localhost:3000/api/admin/events')
    .subscribe({
      next: (data) => this.events = data,
      error: () => alert('Failed to load events')
    });
}

addEvent() {
  this.http.post(
    'http://localhost:3000/api/admin/events',
    this.newEvent
  ).subscribe({
    next: (e) => {
      this.events.push(e);
      this.newEvent = { title: '', location: '', description: '', event_date: '', organized_by: '' };
      this.triggerToast('Event added');
    },
    error: () => alert('Insert failed')
  });
}

startEventEdit(e: any) {
  this.eventEditId = e.id;
  this.eventEdit = { ...e };
}

updateEvent() {
  this.http.put(
    `http://localhost:3000/api/admin/events/${this.eventEditId}`,
    this.eventEdit
  ).subscribe({
    next: () => {
      const index = this.events.findIndex(x => x.id === this.eventEditId);
      this.events[index] = { ...this.eventEdit };
      this.eventEditId = null;
      this.triggerToast('Event updated');
    },
    error: () => alert('Update failed')
  });
}

deleteEvent(id: any) {
  this.http.delete(
    `http://localhost:3000/api/admin/events/${id}`
  ).subscribe({
    next: () => {
      this.events = this.events.filter(e => e.id !== id);
      this.triggerToast('Event deleted');
    },
    error: () => alert('Delete failed')
  });
}

}
