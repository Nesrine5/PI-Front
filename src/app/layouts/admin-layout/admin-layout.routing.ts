import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddBesoinComponent } from 'app/add-besoin/add-besoin.component';
import { LivrableComponent } from 'app/livrable/livrable.component';
import { BesoinComponent } from 'app/besoin/besoin.component';
import { EvaluationComponent } from 'app/evaluation/evaluation.component';
import { EmailComponent } from 'app/email/email.component';
import { FileEvaluationComponent } from 'app/file-evaluation/file-evaluation.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'besoin/:UserId',        component: AddBesoinComponent },
    { path: 'livrable' , component:  LivrableComponent },
    { path: 'innovation', component: BesoinComponent },
    { path: 'evaluation', component:    EvaluationComponent},
   // { path: 'email', component:    EmailComponent},
   // { path: 'fileEvaluation/:UserId', component: FileEvaluationComponent},
   { path: 'fileEvaluation', component: FileEvaluationComponent},

];
