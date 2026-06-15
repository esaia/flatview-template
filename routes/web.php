<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use IrepPlugin\FilamentIrep\Models\Project;

Route::get('/', function () {
    return Inertia::render('Home', [
        'appName' => config('app.name'),
    ]);
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

    return response()->json(['success' => true, 'data' => [
        'project' => $projectData,
        'blocks'  => $project->blocks,
        'floors'  => $project->floors,
        'flats'   => $project->flats,
        'types'   => $project->types,
        'meta'    => $project->meta,
        'actions' => $project->tooltips,
    ]]);
});
