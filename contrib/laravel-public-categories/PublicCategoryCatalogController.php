<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;

class PublicCategoryCatalogController extends Controller
{
    /**
     * Read-only list of categories for storefront / filters (no auth).
     */
    public function index()
    {
        $categories = Category::query()
            ->orderBy('name')
            ->get(['id', 'name', 'subcategories', 'created_at', 'updated_at']);

        return sendResponse(true, 'Categories retrieved successfully.', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
