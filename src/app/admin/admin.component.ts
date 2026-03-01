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
  selectedBatch = '';
  students: any[] = [];

  // EDIT STATE
  editId: number | null = null;
  editStudent: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  showDashboard() {
    this.view = 'dashboard';
  }

  loadBatch(batch: string) {
    this.selectedBatch = batch;
  
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
    alert('Post Events clicked');
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
    },
    error: () => alert('Update failed')
  });
}

deletePlacement(id: any) {
  this.http.delete(
    `http://localhost:3000/api/admin/placements/${id}`
  ).subscribe({
    next: () => this.placements = this.placements.filter(p => p.id !== id),
    error: () => alert('Delete failed')
  });
}

}
