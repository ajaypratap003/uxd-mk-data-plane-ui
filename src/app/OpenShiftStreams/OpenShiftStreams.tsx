import React, {useState} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  Level,
  LevelItem,
  PageSection,
  PageSectionVariants,
  Title,
  Tabs,
  Tab,
  TabContent,
  TabTitleText
} from '@patternfly/react-core';
import { Home } from '../TabSections/Home';
import { Topics } from '../TabSections/Topics';
import { ConsumerGroups } from '../TabSections/ConsumerGroups';
import { Metrics } from '../TabSections/Metrics';
import { CreateTopicsWizard } from '../TabSections/CreateTopicsWizard';
import { TopicItem } from '../TabSections/TopicItem';
import { ClusterConnectionDrawer } from '@app/TabSections/ClusterConnectionDrawer';
import { ConsumerGroupsDrawer } from '@app/TabSections/ConsumerGroupsDrawer';
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon';

const OpenShiftStreams: React.FunctionComponent = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState(0);
  const [isCreateTopic, setIsCreateTopic] = useState(false);
  const [isTopicExpanded, setIsTopicExpanded] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [consumergroupID, setConsumerGroupID] = useState("");
  const drawerRef = React.createRef();
  const contentRef1 = React.createRef();
  const contentRef2 = React.createRef();
  const contentRef3 = React.createRef();
  const contentRef4 = React.createRef();

  const onExpand = () => {
    drawerRef.current && drawerRef.current.focus()
  };

  const onClusterConnection = () => {
    setIsExpanded(!isExpanded);
  };

  const onCloseClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTabClick = (event, tabIndex) => {
    console.log('what is tabIndex  ' + tabIndex);
    setActiveTabKey(tabIndex);
  };

  const mainTabs = (
    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} inset={{default: 'insetMd'}}>
      <Tab
        eventKey={0}
        title={<TabTitleText>Home</TabTitleText>}
        tabContentId="refTab1Section"
        tabContentRef={contentRef1}
      />
      <Tab
        eventKey={1}
        title={<TabTitleText>Topics</TabTitleText>}
        tabContentId="refTab2Section"
        tabContentRef={contentRef2}
      />
      <Tab
        eventKey={2}
        title={<TabTitleText>Consumer groups</TabTitleText>}
        tabContentId="refTab3Section"
        tabContentRef={contentRef3}
      />
      <Tab
        eventKey={3}
        title={<TabTitleText>Metrics</TabTitleText>}
        tabContentId="refTab4Section"
        tabContentRef={contentRef4}
      />
    </Tabs>
  )

  const mainBreadcrumbs = (
    <Breadcrumb>
      <BreadcrumbItem to="#">OpenShift Streams</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        MK Cluster Instance
      </BreadcrumbItem>
    </Breadcrumb>
  )

  return (
    <>
    { !isCreateTopic && !isTopicExpanded &&
      <Drawer isExpanded={isExpanded || isExpanded2} onExpand={onExpand}>
        <DrawerContent panelContent={ isExpanded2 ? <ConsumerGroupsDrawer onCloseClick={onCloseClick} drawerRef={drawerRef} isExpanded={isExpanded}  /> :
            <ClusterConnectionDrawer onCloseClick={onCloseClick} drawerRef={drawerRef} isExpanded={isExpanded}  />
            }>
          <DrawerContentBody>
            <section className="pf-c-page__main-breadcrumb">
              { mainBreadcrumbs }
            </section>
            <PageSection variant={PageSectionVariants.light}>
              <Level>
                <LevelItem>
                  <Title headingLevel="h1" size="xl">MK Cluster Instance</Title>
                </LevelItem>
                <LevelItem>
                  <Button variant="link" icon={<CodeBranchIcon />} iconPosition="right" onClick={onClusterConnection}>
                    Connect to this cluster
                  </Button>
                </LevelItem>
              </Level>
            </PageSection>
            <PageSection variant={PageSectionVariants.light} padding={{ default: 'noPadding'}}>
              {mainTabs}
            </PageSection>
            <PageSection>
              <TabContent eventKey={0} id="refTab1Section" ref={contentRef1} aria-label="Tab item 1">
                <Home
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  setActiveTabKey={setActiveTabKey}
                />
              </TabContent>
              <TabContent eventKey={1} id="refTab2Section" ref={contentRef2} aria-label="Tab item 2" hidden>
                <Topics
                  isCreateTopic={isCreateTopic}
                  setIsCreateTopic={setIsCreateTopic}
                  isTopicExpanded={isTopicExpanded}
                  setIsTopicExpanded={setIsTopicExpanded}
                  setTopicName={setTopicName}
                />
              </TabContent>
              <TabContent eventKey={2} id="refTab3Section" ref={contentRef3} aria-label="Tab item 3" hidden>
                <ConsumerGroups
                  consumergroupID={consumergroupID}
                  setConsumerGroupID={setConsumerGroupID}
                  setIsExpanded2={setIsExpanded2}
                />
              </TabContent>
              <TabContent eventKey={3} id="refTab4Section" ref={contentRef4} aria-label="Tab item 4" hidden>
                <Metrics/>
              </TabContent>
            </PageSection>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
      }
      { isCreateTopic &&
        <CreateTopicsWizard/>
      }
      { isTopicExpanded &&
        <TopicItem topicName={topicName}/>
      }
    </>
  )
}

export { OpenShiftStreams };
