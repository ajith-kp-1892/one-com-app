import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  response : string = ''

  constructor(public authService: AuthService,
              private actRoute: ActivatedRoute) {
    
  }

  ngOnInit() {

  }

  async getProducts() {
    this.response = ''
    const resp = this.authService.getProducts()
    resp.subscribe((res) => {
      this.handleResponse(res)
    })
  }

  async createProduct() {
    this.response = ''
    const resp = this.authService.addProduct()
    resp.subscribe((res) => {
      this.handleResponse(res)
    })
  }

  async deleteProduct() {
    this.response = ''
    const resp = this.authService.deleteProduct()
    resp.subscribe((res) => {
      this.handleResponse(res)
    })
  }

  async updateProduct() {
    const resp = this.authService.updateProduct()
    resp.subscribe((res) => {
      this.handleResponse(res)
    })
  }

  async handleResponse(res : any) {
    if(res.error) {
      this.response = res.error
    } else {
      this.response = JSON.stringify(res)
    }
  }
}
