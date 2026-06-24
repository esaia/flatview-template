<?php

namespace App\Filament\Pages;

use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use IrepPlugin\FilamentIrep\Models\Project;
use IrepPlugin\FilamentIrep\Models\Setting;

class SiteSettings extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-globe-alt';

    protected static string|\UnitEnum|null $navigationGroup = 'Configuration';

    protected static ?string $title = 'Site Settings';

    protected static ?string $navigationLabel = 'Site Settings';

    protected static ?int $navigationSort = 11;

    public ?array $data = [];

    public function getView(): string
    {
        return 'filament.pages.site-settings';
    }

    public function mount(): void
    {
        $this->data = [
            'irep_see_apartments_project' => Setting::get('irep_see_apartments_project'),
        ];
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('"See Apartments" Button')
                    ->description('Choose which project opens when a visitor clicks the "See Apartments" button in the site menu.')
                    ->schema([
                        Select::make('data.irep_see_apartments_project')
                            ->label('Linked project')
                            ->options(fn () => Project::query()->orderBy('title')->pluck('title', 'id'))
                            ->searchable()
                            ->placeholder('Select a project')
                            ->helperText('Opens /project360/{slug} on the public site.')
                            ->nullable(),
                    ]),
            ]);
    }

    public function save(): void
    {
        Setting::updateOrCreate(
            ['key' => 'irep_see_apartments_project'],
            ['value' => (string) ($this->data['irep_see_apartments_project'] ?? ''), 'type' => 'string']
        );

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }
}
