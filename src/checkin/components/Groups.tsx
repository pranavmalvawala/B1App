import React from "react";
import { CheckinHelper, ConfigHelper, EnvironmentHelper } from "../../components";
import { Spinner } from "react-activity";
import { PersonInterface, ServiceTimeInterface, GroupInterface } from "../../appBase/interfaces";
import { Row, Col } from "react-bootstrap";

interface GroupCategoryInterface { key: number, name: string, items: GroupInterface[] }

interface Props { }

export const Groups: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = React.useState<GroupCategoryInterface>(null);
    const [groupTree, setGroupTree] = React.useState<GroupCategoryInterface[]>([]);


    const buildTree = () => {
        var category = "";
        var gt: GroupCategoryInterface[] = [];

        const sortedGroups = CheckinHelper.selectedServiceTime?.groups?.sort((a, b) => {
            return ((a.categoryName || "") > (b.categoryName || "")) ? 1 : -1;
        });

        sortedGroups?.forEach(g => {
            if (g.categoryName !== category) gt.push({ key: gt.length, name: g.categoryName || "", items: [] })
            gt[gt.length - 1].items.push(g);
            category = g.categoryName || "";
        })
        setGroupTree(gt);
    }


    const selectGroup = (group: GroupInterface) => {

    }


    const selectCategory = (category: GroupCategoryInterface) => {
        if (selectedCategory === category) setSelectedCategory(null);
        else setSelectedCategory(category);
    }

    const getCategories = () => {
        if (isLoading) return (<Spinner />)
        else {
            var result: JSX.Element[] = [];
            groupTree.forEach(c => {
                result.push(getCategory(c));
            });
            return (result);
        }
    }

    const getCategory = (category: GroupCategoryInterface) => {
        const arrow = (category === selectedCategory) ? (<i className="fas fa-angle-down"></i>) : (<i className="fas fa-angle-right"></i>);
        const groupList = (category === selectedCategory) ? getGroups() : null;
        return (<>
            <a href="about:blank" className="bigLinkButton checkinPerson" onClick={(e) => { e.preventDefault(); selectCategory(category) }}>
                <Row>
                    <Col xs={1}>{arrow}</Col>
                    <Col xs={11}>
                        {category.name}
                    </Col>
                </Row>
            </a>
            {groupList}
        </>);
    }

    const getGroups = () => {
        var result: JSX.Element[] = [];
        selectedCategory?.items?.forEach(g => {
            result.push(getGroup(g));
        })
        return result;
    }

    const getGroup = (g: GroupInterface) => {
        return (<div className="checkinServiceTime" >
            <a href="about:blank" onClick={(e) => { e.preventDefault(); selectGroup(g) }}>{g.name}</a>
        </div>);
    }

    React.useEffect(() => {
        buildTree()
    }, []);


    return (
        <>
            {getCategories()}
        </>
    )
}