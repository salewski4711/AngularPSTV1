import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pst-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl">
      <div class="flex items-center justify-center min-h-[70vh]">
        <div class="w-full">
          <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to Angular CRM
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            ProSolarTec Customer Relationship Management System
          </p>
          
          <div class="space-y-4">
            <a 
              routerLink="/beta"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <i class="fas fa-rocket mr-2"></i>
              View Component Showcase
            </a>
            
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Check out our new component library in beta
            </p>
          </div>
          
          <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div class="text-orange-500 mb-4">
                <i class="fas fa-users text-3xl"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Customer Management
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Manage your customers and their solar installations
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div class="text-orange-500 mb-4">
                <i class="fas fa-solar-panel text-3xl"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Project Tracking
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Track solar panel installations and maintenance
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div class="text-orange-500 mb-4">
                <i class="fas fa-chart-line text-3xl"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Analytics
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Analyze performance and energy production data
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}