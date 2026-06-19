<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use IrepPlugin\FilamentIrep\Models\Project;
use IrepPlugin\FilamentIrep\Models\Setting;

Route::get('/', function () {
    return Inertia::render('Home', [
        'appName' => config('app.name'),
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/projects', function () {
    return Inertia::render('Projects');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/project/{projectId}', function ($projectId) {
    return Inertia::render('IreProjectPage', ['projectId' => $projectId]);
});

Route::get('/project360/{projectId}', function ($projectId) {
    return Inertia::render('IreProject360Page', ['projectId' => $projectId]);
});

Route::get('/irep/shortcode-data/{projectId}', function ($projectId) {
    $project = Project::with(['meta', 'blocks', 'floors', 'flats.type', 'types', 'tooltips'])
        ->find($projectId);

    if (!$project) {
        return response()->json(['success' => false, 'message' => 'Project not found'], 404);
    }

    $projectData = $project->toArray();
    $projectData['360images'] = $projectData['images_360'] ?? [];
    unset($projectData['images_360']);

    $customTypesSetting = Setting::where('key', 'irep_custom_status_types')->first();
    $customTypes = $customTypesSetting ? json_decode($customTypesSetting->value, true) : [];
    $meta = $project->meta->toArray();
    $meta[] = ['meta_key' => 'custom_types', 'meta_value' => is_array($customTypes) ? $customTypes : []];

    return response()->json(['success' => true, 'data' => [
        'project' => $projectData,
        'blocks'  => $project->blocks,
        'floors'  => $project->floors,
        'flats'   => $project->flats,
        'types'   => $project->types,
        'meta'    => $meta,
        'actions' => $project->tooltips,
    ]]);
});
