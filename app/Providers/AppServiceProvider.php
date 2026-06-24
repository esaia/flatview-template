<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use IrepPlugin\FilamentIrep\Models\Project;
use IrepPlugin\FilamentIrep\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // The project opened by the "See Apartments" menu button. Configured in
        // the admin Settings page; resolved to a /project360/{slug} URL here and
        // shared with every Inertia page. Falls back (null) to the static
        // siteContent default on the frontend.
        Inertia::share('seeApartmentsHref', function () {
            if (! Schema::hasTable('settings')) {
                return null;
            }

            $id = Setting::get('irep_see_apartments_project');
            if (! $id) {
                return null;
            }

            $project = Project::find($id);
            if (! $project) {
                return null;
            }

            return '/project360/' . ($project->slug ?: $project->id);
        });
    }
}
