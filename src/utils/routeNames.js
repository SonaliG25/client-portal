// src/constants/routeNames.js
export const BASE_URL = "http://localhost:3000";
// Auth Routes
export const LOGIN = "/login";
export const REGISTER = "/register";

// Dashboard Routes
export const ADMIN_DASHBOARD = "/admin-dashboard";
export const USER_DASHBOARD = "/user-dashboard";

// Admin Sub-Routes
export const HOME = `${ADMIN_DASHBOARD}/home`;
export const PROPOSALS = `${ADMIN_DASHBOARD}/proposal`;
export const CATEGORYS = `${ADMIN_DASHBOARD}/categories`;
export const NEW_PROPOSAL_TEMPLATE = `${ADMIN_DASHBOARD}/newproposaltemplete`;
export const PROPOSAL_TEMPLATES = `${ADMIN_DASHBOARD}/proposaltempletes`;
export const UPDATE_PROPOSAL_TEMPLATE = `${ADMIN_DASHBOARD}/updateproposaltemplete`;
export const VIEW_PROPOSAL_TEMPLATE = `${ADMIN_DASHBOARD}/viewproposaltemplete`;

// User Management
export const NEW_USER = `${ADMIN_DASHBOARD}/newuser`;
export const ALL_USERS = `${ADMIN_DASHBOARD}/allusers`;
export const VIEW_USER = `${ADMIN_DASHBOARD}/view`;
export const UPDATE_USER = `${ADMIN_DASHBOARD}/update`;

// Product Management
export const ALL_PRODUCTS = `${ADMIN_DASHBOARD}/products`;
export const NEW_PRODUCT = `${ADMIN_DASHBOARD}/newproduct`;
export const ALL_ORDERS = `${ADMIN_DASHBOARD}/orders`;

// Client Routes (if any other than dashboard can be added here)
// e.g. export const CLIENT_PROFILE = '/user-dashboard/profile';

// Fallback/NotFound Route
export const NOT_FOUND = "*";
