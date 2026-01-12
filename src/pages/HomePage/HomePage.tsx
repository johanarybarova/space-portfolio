import { Beyond } from '@/src/components/sections/Beyond/Beyond'
import { Contact } from '@/src/components/sections/Contact/Contact'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Footer } from '@/src/components/shared/Footer/Footer'
import { GalaxyOfRoles } from '@/src/components/sections/GalaxyOfRoles/GalaxyOfRoles'
import { HomeHero } from './HomeHero'
import { Intro } from '@/src/components/sections/Intro/Intro'
import { Michelangelo } from '@/src/components/sections/Michelangelo/Michelangelo'
import { TechnicalCore } from '@/src/components/sections/TechnicalCore/TechnicalCore'
import ThreeScene from '../../components/ThreeScene'

const HomePage = () => (
  <>
    <ThreeScene />
    <Flex as='main' flexCol fullWidth>
      <div className='grain-effect' />
      <HomeHero />
      <Intro />
      <GalaxyOfRoles />
      <TechnicalCore />
      <Beyond />
      <Michelangelo />
      <Contact />
      <Footer />
    </Flex>
  </>
)

export default HomePage
