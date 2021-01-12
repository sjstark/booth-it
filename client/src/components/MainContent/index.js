import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from '../NavBar'
import ShowExplore from '../ShowPages/ShowExplore';
import ShowDetails from '../ShowPages/ShowDetails';
import BoothDetails from '../BoothPages/BoothDetails';
import CreateShowForm from '../ShowPages/CreateShowForm';
import EditShowForm from '../ShowPages/EditShowForm';

import './MainContent.scss'


function Base() {
  return (
    <div>
      Excepteur est minim aliqua est veniam reprehenderit ullamco veniam anim fugiat ut cupidatat. Ut veniam id esse esse pariatur. Ullamco proident laboris voluptate ullamco mollit dolore irure et non sint cillum officia Lorem. Non in aute officia pariatur consectetur culpa quis adipisicing voluptate nostrud sit id minim. Laboris incididunt consectetur velit velit. Consequat sint exercitation eu ut occaecat ullamco laboris consequat est. Dolore Lorem pariatur cupidatat laborum ipsum duis magna aliqua nisi ullamco minim officia laborum anim.

      Fugiat ea laborum aliqua eiusmod est pariatur velit dolore. Id aliqua velit ad voluptate quis laboris officia commodo consectetur dolor minim laborum Lorem. Do cupidatat minim id aliquip aliquip pariatur.

      Amet sint sit esse elit aliquip. Dolore labore irure labore officia voluptate mollit velit aute pariatur. Proident proident veniam officia est veniam est irure cillum dolor. Do sit sint nisi amet nostrud laborum excepteur irure aute aliqua culpa aliqua do. Incididunt in eu ullamco cupidatat. Proident aute qui duis cupidatat culpa ex elit in enim laborum laborum sint.

      Eiusmod id nulla eiusmod anim quis consectetur ad. Reprehenderit consequat culpa irure laborum esse mollit. Laboris amet non labore ex irure elit.

      Enim ipsum tempor ea velit quis non ad officia non. Magna dolore sit dolore cillum nostrud ipsum consectetur Lorem id. Ea pariatur incididunt laborum commodo nulla minim qui excepteur occaecat Lorem veniam. Exercitation laboris deserunt nisi veniam veniam do ullamco elit. Magna qui nulla ad cupidatat amet ea magna reprehenderit elit pariatur in fugiat ut dolor. Eu aliquip aute velit exercitation culpa ut laborum aliqua dolore. Consectetur pariatur est anim excepteur.

      Cillum nisi adipisicing culpa quis Lorem et adipisicing culpa eu sit anim esse. Dolore non in dolor officia irure adipisicing ut nulla aute aute consequat. Pariatur tempor ipsum anim nostrud duis esse.

      Consectetur commodo officia ipsum commodo ex est sunt duis anim mollit aliquip. Nostrud quis elit dolore in laboris aliquip laboris ipsum anim mollit. Sit pariatur velit mollit magna anim non in non nostrud ullamco tempor incididunt. Sunt voluptate reprehenderit dolore voluptate est. Nostrud occaecat sit qui voluptate do aliqua officia aute ea dolore mollit cillum.

      Nisi nulla dolor ipsum Lorem ullamco aute. Nisi id quis elit id ad eu sint ut ex. Magna ex reprehenderit sit et aute proident dolor irure est laborum nostrud. Elit nisi amet aliquip tempor aliqua exercitation ut non reprehenderit sunt.

      Cupidatat est magna magna dolore in culpa est excepteur enim enim duis amet. Ut esse aliqua cupidatat voluptate in et. Id aliqua duis enim culpa ullamco dolor quis excepteur. Non nulla ipsum et cupidatat duis do nostrud minim aliqua.

      Tempor anim ullamco Lorem laborum quis proident amet pariatur id ex ipsum sit culpa. Ullamco dolore deserunt proident enim exercitation commodo fugiat et labore. Enim enim occaecat aute occaecat sit laboris cillum consequat occaecat aliquip minim do quis eu. Incididunt dolor aute adipisicing laborum deserunt Lorem dolore adipisicing sunt excepteur culpa do proident ex. Veniam pariatur cillum pariatur magna consectetur consectetur enim.

      Sit occaecat exercitation aute est voluptate esse amet do qui amet enim. Culpa adipisicing ut aute sit deserunt sint commodo. Enim Lorem quis ut veniam sint nisi est fugiat.

      Et exercitation qui sint dolore adipisicing quis fugiat adipisicing enim do velit. Lorem dolor laboris duis in veniam voluptate commodo non nulla excepteur culpa velit officia sit. Nulla pariatur ex sunt eiusmod laboris culpa nostrud. Cillum do laboris tempor deserunt minim laboris ipsum. Quis ullamco non et consectetur consequat culpa labore. Esse esse in cillum nisi mollit ipsum cillum labore id sunt eu laborum laborum. Exercitation non cillum sit incididunt ad quis adipisicing reprehenderit enim dolore.

      Culpa anim enim mollit quis ex labore consequat occaecat cupidatat dolor. Adipisicing nisi nulla laboris dolore sunt officia et laborum sit pariatur velit enim eu amet. Tempor consectetur sint do veniam reprehenderit excepteur mollit. Pariatur nisi minim incididunt ad id sit culpa aute voluptate esse ad aliqua elit. Cillum occaecat consectetur anim aliquip cupidatat magna sint amet adipisicing irure culpa ad.

      In est id ex incididunt sunt labore laborum officia dolore dolore est reprehenderit. Cillum exercitation enim amet aliqua. In dolor non exercitation ut labore quis non ipsum laborum Lorem esse labore laborum laborum. Mollit excepteur deserunt proident id et non proident elit aliqua ut cupidatat. Veniam aliquip duis fugiat consectetur esse quis voluptate culpa do nostrud reprehenderit ad eiusmod.

      Magna ipsum consequat deserunt magna. Non tempor laboris ipsum id ea minim reprehenderit sunt magna consequat fugiat quis. Adipisicing cupidatat aute do sunt cillum adipisicing fugiat in laborum exercitation. Esse nostrud enim culpa culpa proident anim amet reprehenderit exercitation in commodo amet Lorem. Magna cillum sint consequat ex nulla quis nulla nulla pariatur minim sint consequat dolore. Duis elit nostrud officia ut duis enim Lorem nisi.
    </div>
  )
}


export default function MainContent() {
  return (
    <div className="full-page" >
      <NavBar />
      <div className="main_content">
        <Switch >
          <Route path="/shows/:SID/booths/:BID" component={BoothDetails} exact />
          <Route path="/shows/:SID/edit" exact component={EditShowForm} />
          <Route path="/shows/:SID" exact component={ShowDetails} />
          <Route path="/shows" exact component={ShowExplore} />
          <Route path="/create-show" exact component={CreateShowForm} />
          <Route path="/" component={Base} />
          {/* <Route>
            <NoMatch />
          </Route> */}
        </Switch>
      </div>
    </div >
  )
}
